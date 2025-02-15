import { NextApiRequest, NextApiResponse } from "next";

import { join } from "path";
import { readFileSync } from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const filePath = join(process.cwd(), "public", "sitemap.xml");
        const xmlData = readFileSync(filePath, "utf8");

        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(xmlData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving sitemap", error: (error as Error).message });
    }
}
