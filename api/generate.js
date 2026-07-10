export default async function handler(req, res) {
    const { token } = req.query;
    
    if (!token) {
        return res.status(400).send('Token missing! Invalid request.');
    }

    // 🔥 TUMHARI GPLINKS API KEY 🔥
    const GPLINKS_API_KEY = "391f545c36ad0ddf0675016b22539ed025f2e6e9";
    
    // 🔥 TUMHARI WEBSITE KA REAL LINK JAHAN USER WAPAS AAYEGA 🔥
    const targetUrl = `https://comic-pur.maxton87667.workers.dev/unlock.html?verify=${token}`;
    
    // GPLinks API URL
    const gplinksApiUrl = `https://gplinks.in/api?api=${GPLINKS_API_KEY}&url=${encodeURIComponent(targetUrl)}&format=json`;
    
    try {
        const response = await fetch(gplinksApiUrl);
        const data = await response.json();
        
        if (data.status === "success" && data.shortenedUrl) {
            // User ko seedha GPLinks par REDIRECT kar do (Bypasses Adblocker)
            return res.redirect(302, data.shortenedUrl);
        } else {
            return res.status(500).send('GPLinks API Error: ' + JSON.stringify(data));
        }
    } catch (err) {
        return res.status(500).send('Server request failed');
    }
}
