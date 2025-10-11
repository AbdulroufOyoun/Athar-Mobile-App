import { Text, ScrollView, StatusBar } from 'react-native';

export default function PrivacyScreen() {
  return (
    <ScrollView style={{ marginHorizontal: 10, marginTop: 10 }}>
      <StatusBar translucent barStyle="dark-content" />

      <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 25 }}>
        🎓 سياسة الخصوصية لتطبيق أَثَر
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        نحن في أَثَر نولي أهمية قصوى لخصوصية بياناتك الشخصية وحمايتها. تصف هذه السياسة كيف نجمع
        ونستخدم ونحمي ونكشف عن معلوماتك الشخصية عند استخدامك لتطبيقنا والخدمات التعليمية الجامعية
        التي يقدمها. باستخدامك للتطبيق، فإنك توافق على ممارسات جمع واستخدام البيانات الموضحة في هذه
        السياسة.
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
        1. المعلومات التي نقوم بجمعها
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        نقوم بجمع نوعين أساسيين من المعلومات لتمكين تقديم خدماتنا التعليمية وتحسينها:
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        أ. المعلومات الشخصية التي تقدمها مباشرة (عند التسجيل والاشتراك): تشمل الاسم الكامل، البريد
        الإلكتروني، كلمة المرور، رقم الهاتف، اسم الجامعة، الكلية، معلومات الدفع، والمحتوى الذي تنشئه
        مثل التعليقات والأسئلة.
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        ب. معلومات الاستخدام والبيانات الأكاديمية التي يتم جمعها تلقائيًا: مثل نوع الجهاز، نظام
        التشغيل، وسلوك الاستخدام داخل التطبيق.
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
        2. كيف نستخدم معلوماتك
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        نستخدم البيانات لتقديم الخدمات التعليمية، التحقق من الهوية، تسهيل الدفع، تقديم الدعم الفني،
        تحسين التطبيق، والتواصل معك بشأن الكورسات والمواعيد والتحديثات.
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
        3. مشاركة وكشف المعلومات
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        لا نبيع أو نؤجر بياناتك الشخصية. نشاركها فقط عند الضرورة القانونية أو لحماية حقوقنا ومستخدمي
        التطبيق.
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
        4. أمن البيانات وحمايتها
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        نتخذ إجراءات أمنية لحماية بياناتك، بما في ذلك التشفير أثناء النقل والتخزين، ونحتفظ بها فقط
        للفترة اللازمة لتقديم الخدمة أو حسب القوانين المعمول بها.
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
        5. حقوق المستخدم
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        لديك الحق في الوصول إلى بياناتك، وتصحيحها إذا كانت غير دقيقة أو غير مكتملة.
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
        6. التواصل وتعديلات السياسة
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginTop: 10 }}>
        إذا كان لديك أي استفسار، يمكنك التواصل معنا عبر حسابات التواصل الاجتماعي الموجودة في صفحة
        "نبذة عنا". نحتفظ بحق تعديل هذه السياسة من وقت لآخر، وسيتم إعلامك بأي تغييرات هامة.
      </Text>

      <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 25, marginTop: 30 }}>
        📱 تواصل معنا
      </Text>

      <Text style={{ textAlign: 'right', fontSize: 18, marginBottom: 30 }}>
        ابقَ على اتصال وتابع آخر التحديثات والعروض عبر حساباتنا على وسائل التواصل الاجتماعي.
      </Text>
    </ScrollView>
  );
}
