const userNotes = {
    "João_13_20": "Algum texto de nota",
    "João_13_21": "",
    "João_13_22": "      ",
    "João_13_23": "<div><br></div>"
};

const versesWithNotes = new Set();
Object.keys(userNotes).forEach(key => {
    // Only add if the note actually has content
    const rawNote = userNotes[key];
    
    // Simplistic check for empty/blank HTML
    let isBlank = false;
    if (!rawNote || rawNote.trim() === "") {
        isBlank = true;
    } else {
        const textContent = rawNote.replace(/<[^>]*>?/gm, '').trim();
        if (textContent === "") {
            isBlank = true;
        }
    }
    
    if (!isBlank) {
        console.log("Has Note:", key);
    } else {
        console.log("Empty Note:", key);
    }
});
