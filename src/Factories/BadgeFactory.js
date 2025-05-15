import path from 'path';
import sharp from 'sharp';
import fs from 'fs/promises';  // Using fs.promises API (ES6)
import PlaceholderHandler from "../Services/PlaceholderHandler.js";

export default class BadgeFactory {

    static async make({ title, description, prize, color}) {
        const rootDir = process.cwd();
        const templatePath = path.join(rootDir, "/assets/template.svg");
        const buffer = await fs.readFile(templatePath);
        const data = buffer.toString("utf8");
        const placeholderHandler = new PlaceholderHandler;
        const instance = placeholderHandler.replace(data, {prize, title, description, color});
        return await sharp(Buffer.from(instance, "utf8")).png().toBuffer();
    }
}
