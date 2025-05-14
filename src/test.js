import fs from "fs"
import BadgeFactory from "./Factories/BadgeFactory.js";

const result = await BadgeFactory.make({ 
    title: "DEPRAVATE!", 
    description: "Le tette della tegola, eh, zozze?", 
    prize: 500,
    color: null
});

fs.writeFileSync('test.png', result);
