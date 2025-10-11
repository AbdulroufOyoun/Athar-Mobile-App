import { Text, ScrollView, View, TouchableWithoutFeedback, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function AboutUsScreen() {
  const [telegramUrl, setTelegramUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const openInstagram = () => {
    Linking.openURL(instagramUrl);
  };
  const openTelegram = () => {
    Linking.openURL(telegramUrl);
  };
  const openWhatsapp = () => {
    Linking.openURL(whatsappUrl);
  };
  return (
    <ScrollView style={{ marginHorizontal: 10, marginTop: 10 }}>
      <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 25 }}>🎓 نبذة عنا </Text>

      <Text style={{ textAlign: 'right', fontSize: 18 }}>
        أطلقنا تطبيقنا ليكون بوابتك الذكية نحو التفوق الأكاديمي. نحن منصة تعليمية متخصصة في تقديم
        كورسات لمواد الجامعات الخاصة، مصممة بعناية لتناسب احتياجات الطلاب وتواكب أحدث المناهج.
      </Text>
      <Text style={{ textAlign: 'right', fontSize: 18 }}>
        هدفنا هو تسهيل الوصول إلى المعرفة، وتقديم محتوى تعليمي مبسط، شامل، ومتاح في أي وقت ومن أي
        مكان. سواء كنت تبحث عن شرح مفصل، ملخصات مركزة، أو اختبارات تدريبية، نحن هنا لنكون رفيقك في
        رحلة النجاح.
      </Text>
      <Text style={{ textAlign: 'right', fontSize: 18 }}>
        نؤمن بأن التعليم ليس مجرد معلومات، بل تجربة متكاملة. لذلك، نعمل باستمرار على تطوير المحتوى،
        وتحسين تجربة المستخدم، وتوفير دعم فني وتعليمي مميز.
      </Text>
      <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 25, marginTop: 20 }}>
        📱 تواصل معنا
      </Text>
      <Text style={{ textAlign: 'right', fontSize: 18 }}>
        ابقَ على اتصال وتابع آخر التحديثات والعروض عبر حساباتنا على وسائل التواصل الاجتماعي:
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
        <TouchableWithoutFeedback onPress={openInstagram}>
          <FontAwesome name="instagram" size={50} color="red" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={openTelegram}>
          <FontAwesome name="telegram" size={50} color="#0088cc" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={openWhatsapp}>
          <FontAwesome name="whatsapp" size={50} color="green" />
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
}
