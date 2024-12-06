// Select scroll container and buttons
const scrollContainer = document.querySelector('.scroll-content');
const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');

// Scroll Left
scrollLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -200,
        behavior: 'smooth',
    });
});

// Scroll Right
scrollRight.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: 200,
        behavior: 'smooth',
    });
});

// Categories data
const categoriesData = {
    blogger: {
        description: 'Bloggers are digital wordsmiths who craft engaging narratives on topics like travel, food, fashion, or tech. They can spin an everyday experience into an insightful read or share hacks to make your life better. Armed with keyboards and caffeine, they thrive on SEO, catchy headlines, and connecting with their audience. Their blogs are like a cozy coffee shop where ideas brew and conversations flourish. "Bloggers don’t just write stories; they create bookmarks in people’s lives."',
        topCreators: [
            { name: 'Nomadic Notes', type: 'Travel Blogger', image: 'assets/video.jpg' },
            { name: 'The Minimalist Baker', type: 'Food Blogger', image: 'assets/mentor.jpg' },
        ],
    },
    vlogger: {
        description: 'Vloggers are the charismatic storytellers of the video world, taking viewers on virtual adventures, be it their daily routines or exotic trips. They’re part entertainer, part director, and part editor, seamlessly blending creativity with technology. From cinematic shots to heartfelt monologues, vloggers are a perfect mix of Spielberg and selfie stick. "If a picture is worth a thousand words, a vlog is worth a million emotions."',
        topCreators: [
            { name: 'Casey Neistat', type: 'Lifestyle and Travel Vlogger', image: 'assets/video.jpg' },
            { name: 'Emma Chamberlain', type: 'Comedy and Lifestyle Vlogger', image: 'assets/mentor.jpg' },
        ],
    },
    podcaster: {
        description: 'Podcasters are the audio magicians who bring stories to life, one episode at a time. They create everything from deep dives into mysteries to laugh-out-loud interviews. Armed with a mic and an inquisitive mind, they make mundane commutes interesting and sleepless nights bearable. Their voices linger in your head like a catchy tune but without the annoying chorus. "Good podcasts feel like eavesdropping on your favorite people’s conversations."',
        topCreators: [
            { name: 'Joe Rogan', type: 'Interview and Discussion Podcaster', image: 'assets/video.jpg' },
            { name: 'Crime Junkie', type: 'True Crime Podcast Creators', image: 'assets/mentor.jpg' },
        ],
    },
    photographers: {
        description: 'Photographers are the unsung poets of light, capturing fleeting moments and turning them into timeless memories. From dreamy landscapes to candid portraits, they see the beauty that escapes the naked eye. Whether they’re crawling in the dirt for the perfect angle or chasing golden hour, they’re always in pursuit of the next breathtaking shot. "Behind every great photo is a photographer who probably hasn’t had lunch yet."',
        topCreators: [
            { name: 'Brandon Woelfel', type: 'Portrait Photographer', image: 'assets/video.jpg' },
            { name: 'Chris Burkard', type: 'Landscape Photographer', image: 'assets/mentor.jpg' },
        ],
    },
    writer: {
        description: 'Writers are the architects of imagination, creating worlds with words and characters that stay with you forever. Whether they’re penning soulful poetry, thrilling mysteries, or informative articles, their craft is equal parts genius and madness. With deadlines chasing them and coffee sustaining them, they prove the pen is mightier than the procrastination. "Writers don’t just write; they bleed words onto the page."',
        topCreators: [
            { name: 'J.K. Rowling', type: 'Fiction and Fantasy Author', image: 'assets/video.jpg' },
            { name: 'Malcolm Gladwell', type: 'Non-Fiction Author', image: 'assets/mentor.jpg' },
        ],
    },
    social: {
        description: 'Influencers are the modern-day pied pipers, leading their followers through trends, brands, and life hacks with every post and reel. They are the virtuosos of content creation, blending humor, creativity, and relatability to keep audiences hooked. Whether it’s the perfect flat-lay or a viral TikTok dance, their timelines are where the magic happens. "An influencer’s greatest skill? Making every selfie look effortless when it took 47 tries."',
        topCreators: [
            { name: 'Chiara Ferragni', type: 'Fashion Influencer', image: 'assets/video.jpg' },
            { name: 'MrBeast', type: 'Entertainment Influencer', image: 'assets/mentor.jpg' },
        ],
    },
    streamers: {
        description: 'Streamers are the digital entertainers of our time, blending talent, wit, and endless energy into live broadcasts. Whether they’re gaming, painting, or just chatting, they build communities one laugh and one epic fail at a time. Their catchphrases become slogans, and their streams are as unpredictable as the internet itself. "Streamers are proof that even the smallest webcam can capture the biggest personalities."',
        topCreators: [
            { name: 'Ninja (Tyler Blevins)', type: 'Gaming Streamer', image: 'assets/video.jpg' },
            { name: 'Pokimane (Imane Anys)', type: 'Variety Streamer', image: 'assets/mentor.jpg' },
        ],
    },
    graphic: {
        description: 'Digital artists are the Picasso of pixels, transforming blank canvases into stunning visuals. They’re the minds behind the logos you love, the posters you admire, and the memes you can’t stop sharing. With a mouse as their brush and creativity as their palette, they redefine art in the digital age. "Graphic designers don’t make mistakes—they create ‘modern art.’"',
        topCreators: [
            { name: 'Aaron Draplin', type: 'Logo and Branding Designer', image: 'assets/video.jpg' },
            { name: 'Lois van Baarle', type: 'Digital Illustrator', image: 'assets/mentor.jpg' },
        ],
    },
    memers: {
        description: 'Memers are the wizards of wit who bring humor to the dullest of days. They take pop culture, relatable scenarios, and trending topics to create viral masterpieces. With just the right amount of sarcasm and creativity, they make the internet a better place, one caption at a time. "Memers: Turning ‘I can’t even’ into content we can’t stop laughing at."',
        topCreators: [
            { name: 'Meme King', type: 'Comedy', image: 'assets/video.jpg' },
            { name: 'Laugh Guru', type: 'Satire', image: 'assets/mentor.jpg' },
        ],
    },
    educational: {
        description: 'These creators are the unsung heroes of the internet, making complex topics fun and digestible. They turn boring subjects into thrilling discoveries with quirky experiments, engaging visuals, and a knack for storytelling. Their content is where curiosity meets entertainment, and everyone comes out smarter. "Teaching online is an art; making it fun is pure wizardry."',
        topCreators: [
            { name: 'Khan Academy', type: 'Academic Learning Creators', image: 'assets/video.jpg' },
            { name: 'Kurzgesagt – In a Nutshell', type: 'Animated Educational Content', image: 'assets/mentor.jpg' },
        ],
    },
    music: {
        description: 'Musicians and producers are the architects of soundscapes, crafting melodies that tug at your heartstrings or make you dance like no one’s watching. From soulful ballads to electrifying beats, their work inspires, entertains, and connects us. They are proof that music truly is the language of the soul. "Behind every hit song is a musician who accidentally discovered it while jamming."',
        topCreators: [
            { name: 'Hans Zimmer', type: 'Film Score Composer', image: 'assets/video.jpg' },
            { name: 'Finneas O’Connell', type: 'Music Producer and Songwriter', image: 'assets/mentor.jpg' },
        ],
    },
    fitness: {
        description: 'Fitness coaches are the motivational forces who push us to sweat now and shine later. They combine science, dedication, and just a hint of tough love to transform lifestyles. Whether they’re busting diet myths or creating killer workout plans, they are the epitome of health and hustle. "Coaches don’t yell—they just raise their voice at your excuses."',
        topCreators: [
            { name: 'Chloe Ting', type: 'Fitness Trainer', image: 'assets/video.jpg' },
            { name: 'Jeff Cavaliere', type: 'Strength and Conditioning Coach', image: 'assets/mentor.jpg' },
        ],
    },
    animation: {
        description: 'Animators are the dream weavers of the digital world, breathing life into characters and stories through their art. From hilarious cartoons to mesmerizing visual effects, their work blends technology with imagination. They bring impossible worlds to life, one frame at a time. "Animation: The only job where doodling in meetings is encouraged."',
        topCreators: [
            { name: 'Hayao Miyazaki', type: 'Anime Creator', image: 'assets/video.jpg' },
            { name: 'Genndy Tartakovsky', type: 'Cartoon Animator', image: 'assets/mentor.jpg' },
        ],
    },
    'news-creators': {
        description: 'Journalists are the watchdogs of society, bringing stories that matter to the forefront. From investigative reporting to live coverage, they chase the truth with unwavering passion. They are storytellers, truth-seekers, and adrenaline junkies who thrive under pressure. "Good journalism is writing history’s first draft with a cup of cold coffee."',
        topCreators: [
            { name: 'Anderson Cooper', type: 'Broadcast Journalist', image: 'assets/video.jpg' },
            { name: 'Christiane Amanpour', type: 'Investigative Journalist', image: 'assets/mentor.jpg' },
        ],
    },
};

// Event listeners for content boxes
document.querySelectorAll('.creator-card').forEach((card) => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        const data = categoriesData[category];

        if (data) {
            // Update Content Type Heading
            document.getElementById('selected-category').textContent = card.querySelector('p').textContent;

            // Update the description and quote
            const descriptionEl = document.getElementById('category-description');
            descriptionEl.textContent = data.description.split('"')[0];
            descriptionEl.dataset.quote = data.description.split('"')[1];

            // Update Top Creators
            const [creator1, creator2] = data.topCreators;

            const creator1Img = document.querySelector('#creator1 img');
            creator1Img.src = creator1.image;
            document.querySelector('#creator1 .creator-name').textContent = creator1.name;
            document.querySelector('#creator1 .creator-type').textContent = creator1.type;

            const creator2Img = document.querySelector('#creator2 img');
            creator2Img.src = creator2.image;
            document.querySelector('#creator2 .creator-name').textContent = creator2.name;
            document.querySelector('#creator2 .creator-type').textContent = creator2.type;

            // Confetti Effect at Top of "Top Content Creators" Heading
            const heading = document.getElementById('top-creators-heading');
            const boundingBox = heading.getBoundingClientRect();

            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    x: (boundingBox.left + boundingBox.width / 2) / window.innerWidth,
                    y: boundingBox.top / window.innerHeight,
                },
            });

            // Show Category Info Section
            document.getElementById('category-info').classList.remove('hidden');
        } else {
            console.error(`No data found for category: ${category}`);
        }
    });
});
