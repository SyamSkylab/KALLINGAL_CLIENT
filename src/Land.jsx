import React from 'react';
import NavBar from './Nav';
import { Slider } from './Carousel';
import kaachiya from './assets/kaachiya.png';
import logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';

export const Land = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-gradient-to-bl from-green-900 via-white to-green-900 text-gray-800 min-h-screen font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full h-20 sm:h-20 bg-gradient-to-br from-green-900 via-black to-green-900 text-white flex items-center justify-between px-4 shadow-md z-50">
                <img src={logo} alt="Logo" style={{ height: '200px', width: '200px' }} />
                <NavBar />
            </header>

            {/* Main Content */}
            <main className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                {/* Carousel */}
                <section className="mb-10 sm:mb-12">
                    <div className="rounded-3xl overflow-hidden border border-green-300 shadow-lg">
                        <Slider />
                    </div>
                </section>

                {/* Hero Image */}
                <section className="flex bg-gradient-to-b from-green-900 rounded-4xl via-black to-green-900 justify-center mb-10 sm:mb-12">
                    <img
                        src={kaachiya}
                        alt="Kaachiya Oil"
                        className="w-full max-w-[600px] rounded-2xl shadow-md object-contain"
                    />
                </section>

                {/* Product Description */}
                <section className="space-y-10 sm:space-y-12">
                    <h2 className="text-center text-2xl sm:text-4xl font-semibold text-green-800 mb-4">
                        Kallingal Herbal Hair Oil 🌿
                    </h2>

                    {/* Multi-language Descriptions */}
                    <DescriptionBox
                        lang="മലയാളം"
                        bgColor="bg-green-50"
                        content={`"തേങ്ങാ പാൽ, ചെമ്പരത്തി, തെച്ചി, തുളസി, കഞ്ഞുണ്ണി, പനികൂർക്ക, കറിവേപ്പില, ആര്യവേപ്പില, ബ്രഹ്മി, കടുക്ക, ഇരട്ടിമധുരം, ദേവതാരം തുടങ്ങിയ മറ്റു ഔഷധ കൂട്ടുകളും ചേർത്ത് വീട്ടിൽ കാച്ചിയെടുക്കുന്ന വെളിച്ചെണ്ണ"🥥🌿

✅Solution for Hair loss & Dandruff
✅100% Organic
✅Homemade product
✅SVEP Certified product

📌100ml -150rs
📌200ml -250rs


"🫵Invest in Your Hair's Health, shine with confidently"- 🛒Order Now`}
                    />

                    <DescriptionBox
                        lang="English"
                        bgColor="bg-white"
                        border
                        content={`KALLINGAL HERBAL HAIR OIL
"A pure coconut oil infused at home with natural ingredients like hibiscus, ixora, holy basil (tulsi), balloon vine, panikoorka, curry leaves, neem leaves, brahmi, haritaki, sweet flag, devadaram, rosemary, and other medicinal herbs." 🥥🌿

✅ Solution for Hair Loss & Dandruff
✅ 100% Organic
✅ Homemade Product
✅ SVEP Certified Product
📌 100ml – ₹150
📌 200ml – ₹250

“🫵 Invest in Your Hair’s Health — Shine with Confidence”
🛒 Order Now`}
                    />

                    <DescriptionBox
                        lang="தமிழ்"
                        bgColor="bg-green-50"
                        content={`KALLINGAL HERBAL HAIR OIL
"தேங்காய் எண்ணையில் செம்பருத்தி, தெச்சி, துளசி, கஞ்சுண்ணி, பனிக்கூர்க்கா, கருவேப்பிலை, ஆரியவேப்பிலை, பிரம்மி, கடுக்காய், இரட்டிமதுரம், தேவதாரம், ரோஸ்மேரி மற்றும் பல மருத்துவ மூலிகைகள் சேர்த்து வீட்டு முறையில் காய்ச்சியெடுக்கப்பட்டது." 🥥🌿

✅ முடி விழுதல் மற்றும் தேமல் நீங்க சிறந்த தீர்வு
✅ 100% இயற்கை தயாரிப்பு
✅ வீட்டு தயாரிப்பு
✅ SVEP சான்றளிக்கப்பட்ட தயாரிப்பு
📌 100மில்லி – ₹150
📌 200மில்லி – ₹250

“🫵 உங்கள் முடியின் ஆரோக்கியத்தில் முதலீடு செய்யுங்கள் — நம்பிக்கையுடன் ஜொலியுங்கள்”
🛒 இப்போது ஆர்டர் செய்யுங்கள்`}
                    />

                    <DescriptionBox
                        lang="العربية"
                        bgColor="bg-white"
                        border
                        content={`زيت الشعر العشبي "كالينغال"
"زيت جوز الهند المغلي في المنزل مع مكونات عشبية مثل: حليب جوز الهند، الكركديه، تيشي، التولسي، كانجونني، فلفل هندي، أوراق الكاري، أوراق النيم، براهمي، كادوكّا، إيراتيمدهورام، ديفاثارام، وإكليل الجبل وغيرها من الأعشاب الطبية." 🥥🌿

✅ حل لتساقط الشعر والقشرة
✅ عضوي 100%
✅ منتج منزلي
✅ منتج حاصل على شهادة SVEP

📌 100 مل - 150 روبية
📌 200 مل - 250 روبية

"🫵 استثمر في صحة شعرك، وتألق بثقة" - 🛒 اطلب الآن!`}
                    />
                </section>

                {/* Call to Action */}
                <section className="text-center mt-14 sm:mt-16">
                    <button onClick={() => {
                        console.log(import.meta.env.SERVER_URL);
                        navigate('/book')
                    }} className="bg-green-700 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-medium shadow-md hover:bg-green-800 transition-all">
                        🛒 Order Now
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-green-900 text-white py-6 mt-16">
                <div className="text-center text-sm sm:text-base">
                    © {new Date().getFullYear()} Kallingal Herbal Oil. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

// Reusable Description Box
const DescriptionBox = ({ lang, bgColor, content, border }) => (
    <div
        className={`${bgColor} p-4 sm:p-6 rounded-xl shadow-sm ${border ? 'border border-gray-200' : ''}`}
    >
        <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-2">{lang}</h3>
        <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base whitespace-pre-line">
            {content}
        </p>
    </div>
);
