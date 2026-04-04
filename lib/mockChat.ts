import type { ReplyLanguage } from "@/lib/replyLanguage";

export type TutorRole = "user" | "assistant";

export type TutorMessage = {
  id: string;
  role: TutorRole;
  content: string;
};

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const INITIAL_TUTOR_MESSAGE: TutorMessage = {
  id: "assistant-initial",
  role: "assistant",
  content:
    "Namaste! I'm here to help Indian students planning to study in Ireland. Ask me about visas, accommodation, education loans, universities, or course choices."
};

export const createTutorMessage = (
  role: TutorRole,
  content: string
): TutorMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content
});

function selectLocalizedReply(
  replyLanguage: ReplyLanguage,
  content: {
    english: string;
    hinglish: string;
    hindi: string;
  }
) {
  return content[replyLanguage];
}

export async function getMockTutorReply(
  message: string,
  replyLanguage: ReplyLanguage = "english"
) {
  await delay(800);

  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("visa") ||
    normalizedMessage.includes("embassy") ||
    normalizedMessage.includes("stamp") ||
    normalizedMessage.includes("sop") ||
    normalizedMessage.includes("financial")
  ) {
    return selectLocalizedReply(replyLanguage, {
      english:
        "For an Ireland student visa plan, start with your offer letter, passport, fee payment proof, financial documents, and a clear statement of purpose. I can help you turn this into a simple checklist if you share your intake and course.",
      hinglish:
        "Ireland student visa ke liye sabse pehle offer letter, passport, fee payment proof, financial documents, aur clear statement of purpose ready rakho. Agar tum intake aur course batao, toh main isse simple checklist mein tod dunga.",
      hindi:
        "आयरलैंड छात्र वीजा के लिए सबसे पहले अपना ऑफर लेटर, पासपोर्ट, फीस भुगतान प्रमाण, वित्तीय दस्तावेज और स्पष्ट स्टेटमेंट ऑफ पर्पस तैयार रखें। अगर आप अपना इंटेक और कोर्स बताएं, तो मैं इसे सरल चेकलिस्ट में बदल दूंगा।"
    });
  }

  if (
    normalizedMessage.includes("accommodation") ||
    normalizedMessage.includes("housing") ||
    normalizedMessage.includes("rent") ||
    normalizedMessage.includes("dublin") ||
    normalizedMessage.includes("cork") ||
    normalizedMessage.includes("galway")
  ) {
    return selectLocalizedReply(replyLanguage, {
      english:
        "For accommodation in Ireland, compare rent, commute time, deposit amount, and whether utilities are included. A smart first shortlist is shared student housing, university accommodation, and areas with reliable transport to campus.",
      hinglish:
        "Ireland accommodation compare karte time rent, commute time, deposit amount, aur utilities included hain ya nahi, yeh sab dekho. Shuruat ke liye shared student housing, university accommodation, aur campus ke paas good transport wale areas shortlist karo.",
      hindi:
        "आयरलैंड में आवास चुनते समय किराया, आने-जाने का समय, डिपॉजिट राशि और यूटिलिटी शामिल हैं या नहीं, यह सब तुलना करें। शुरुआत के लिए साझा छात्र आवास, विश्वविद्यालय आवास और कैंपस के पास अच्छे परिवहन वाले क्षेत्रों को शॉर्टलिस्ट करें।"
    });
  }

  if (
    normalizedMessage.includes("loan") ||
    normalizedMessage.includes("finance") ||
    normalizedMessage.includes("budget") ||
    normalizedMessage.includes("scholarship")
  ) {
    return selectLocalizedReply(replyLanguage, {
      english:
        "For education loan planning, break it into tuition, living costs, upfront deposit, and emergency buffer. I can help you map what part might be covered by savings, loan amount, and scholarship options.",
      hinglish:
        "Education loan planning ko tuition, living costs, upfront deposit, aur emergency buffer mein divide karo. Main help kar sakta hoon ki savings, loan amount, aur scholarship options se kaunsa part cover ho sakta hai.",
      hindi:
        "शिक्षा ऋण योजना को ट्यूशन, रहने का खर्च, शुरुआती जमा राशि और आपातकालीन बफर में बांटें। मैं यह समझाने में मदद कर सकता हूँ कि बचत, ऋण राशि और स्कॉलरशिप विकल्पों से कौन सा हिस्सा कवर हो सकता है।"
    });
  }

  if (
    normalizedMessage.includes("university") ||
    normalizedMessage.includes("college") ||
    normalizedMessage.includes("course") ||
    normalizedMessage.includes("masters") ||
    normalizedMessage.includes("msc") ||
    normalizedMessage.includes("program")
  ) {
    return selectLocalizedReply(replyLanguage, {
      english:
        "When choosing an Ireland university or course, compare career outcomes, total cost, city lifestyle, internship chances, and how well the modules match your background. Tell me your subject and budget, and I can help you narrow the options.",
      hinglish:
        "Ireland university ya course choose karte time career outcomes, total cost, city lifestyle, internship chances, aur modules tumhare background se kitna match karte hain, yeh compare karo. Subject aur budget batao, main options narrow karne mein help karunga.",
      hindi:
        "आयरलैंड में विश्वविद्यालय या कोर्स चुनते समय करियर परिणाम, कुल लागत, शहर की जीवनशैली, इंटर्नशिप के अवसर और मॉड्यूल आपके बैकग्राउंड से कितना मेल खाते हैं, इसकी तुलना करें। अपना विषय और बजट बताएं, मैं विकल्प कम करने में मदद करूँगा।"
    });
  }

  return selectLocalizedReply(replyLanguage, {
    english:
      "I can help with Ireland student visa steps, accommodation planning, loan questions, university shortlisting, and course comparisons. Tell me your intake, subject, or city preference and we can break it down together.",
    hinglish:
      "Main Ireland student visa steps, accommodation planning, loan questions, university shortlisting, aur course comparisons mein help kar sakta hoon. Apna intake, subject, ya city preference batao, phir hum isse saath mein break down karenge.",
    hindi:
      "मैं आयरलैंड छात्र वीजा प्रक्रिया, आवास योजना, शिक्षा ऋण, विश्वविद्यालय शॉर्टलिस्टिंग और कोर्स तुलना में मदद कर सकता हूँ। अपना इंटेक, विषय या शहर की पसंद बताइए, फिर हम इसे साथ में आसान हिस्सों में समझेंगे।"
  });
}
