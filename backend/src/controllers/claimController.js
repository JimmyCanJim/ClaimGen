import {Claim} from '../models/Claim.js';


const generateVerifiedId = async () => {
    const year = new Date().getFullYear();
    const shortId = Math.random().toString(36).substring(2, 6).toUpperCase();
    const candidate = `CLM-${year}-${shortId}`;

    const exists = await Claim.findOne({ claimNumber: candidate });
    return exists ? generateVerifiedId() : candidate;
};

export const getNewClaimId = async (req, res) => {
    try {
        const uniqueId = await generateVerifiedId();
        res.status(200).json({ claimId: uniqueId });
    } catch (error) {
        console.log("Crash Error: ", error);
        res.status(500).json({ error: error.message });
    }
};

export const getClaimById = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find the claim and "populate" the assessor's name (optional but professional)
        const claim = await Claim.findById(id).populate("assessor", "name email");

        // 2. Check if the claim actually exists
        if (!claim) {
            return res.status(404).json({ message: "Claim not found in ledger." });
        }

        // 3. Authorization Check: Ensure only the person who created it (or an admin) can see it
        // This prevents adjusters from snooping on each other's files
        if (claim.assessor._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied. This is not your claim file." });
        }

        res.status(200).json(claim);
        
    } catch (error) {
        // If the ID is malformed (e.g., not a valid MongoDB ObjectId), catch the error
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid Claim ID format." });
        }
        res.status(500).json({ message: "Server error retrieving claim.", error: error.message });
    }
};

export const createClaim = async (req, res) => {
    try {
        const {
            claimId,
            clientName,
            dasNumber,
            phoneNumbers,
            email,
            address,
            insuranceProvider,
            customInsurance,
            advisor,
            natureOfClaim,
        } = req.body;
        
        const nameParts = clientName.trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

        const finalProvider = insuranceProvider === "Other" ? customInsurance : insuranceProvider;

        const newClaim = new Claim({
            claimNumber: await generateVerifiedId(), // Use the generator we built
            assessor: req.user._id,
            assReference: dasNumber,
            client: {
                firstName,
                lastName,
                address,
                email,
                phoneNumber: phoneNumbers[0],
            },
            insurance: {
                provider: finalProvider,
                advisor: advisor
            },
            causeOfLoss: natureOfClaim,
            status: "Pending",
        });

        await newClaim.save();

        res.status(201).json({ message: "Claim registered successfully", claim: newClaim });
    } catch (error) {
        console.error("Mapping Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};