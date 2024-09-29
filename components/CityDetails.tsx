import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function CityDetails() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        Jaipur is famously known as the Pink City due to the uniform terracotta
        pink hue of its buildings, a color that symbolizes hospitality. This
        tradition dates back to 1876 when the city was painted pink to welcome
        the Prince of Wales, later King Edward VII. The old part of the city
        still retains this pink charm, especially around the Johari Bazaar and
        Bapu Bazaar areas.
      </Text>

      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        The striking Hawa Mahal (Palace of Winds) is one of Jaipur’s most famous
        landmarks. Built in 1799, it was designed for royal women to observe
        street festivals and processions without being seen. Its façade, with
        953 small windows or 'jharokhas', is an architectural masterpiece.
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.subtitle }]}>
        History of Jaipur
      </Text>
      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        Jaipur's origins can be traced back to the reign of Maharaja Sawai Jai
        Singh II, who moved the capital from Amber Fort to Jaipur to accommodate
        the growing population and ensure better defense. The city was
        meticulously planned by architect Vidyadhar Bhattacharya based on the
        principles of Vastu Shastra, making it one of India’s first planned
        cities.
      </Text>

      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        The foundation of Jaipur in the 18th century marked the beginning of a
        new era for the Rajputs, as the city grew to become a center of arts,
        science, and culture.
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.subtitle }]}>
        Jaipur's Royal Heritage
      </Text>
      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        Jaipur’s royalty continues to be a significant part of the city's
        identity. The City Palace is a royal residence that stands as a
        testament to Jaipur’s regal legacy. Parts of it have been converted into
        a museum, showcasing artifacts from the city’s illustrious past,
        including weapons, garments, and manuscripts.
      </Text>

      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        Another jewel of the Pink City is the Amber Fort, a short drive from
        Jaipur. This stunning hilltop fort was the capital before Jaipur and
        boasts a blend of Hindu and Mughal architecture. The fort's Sheesh Mahal
        (Hall of Mirrors) is one of its most captivating features.
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.subtitle }]}>
        Jaipur's Festivals and Culture
      </Text>
      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        Jaipur is also a cultural hub, hosting a variety of festivals throughout
        the year that reflect the city's rich heritage. The Jaipur Literature
        Festival, held annually, is the world's largest free literary festival,
        attracting renowned authors from across the globe.
      </Text>

      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        The Teej and Gangaur festivals are celebrated with great enthusiasm in
        Jaipur. Teej is a monsoon festival that celebrates the union of Goddess
        Parvati and Lord Shiva, while Gangaur is dedicated to Goddess Gauri and
        Lord Shiva. These festivals feature processions, traditional dance, and
        music, adding to the city's vibrant cultural fabric.
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.subtitle }]}>
        Jaipur's Cuisine
      </Text>
      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        No trip to Jaipur is complete without indulging in its rich and
        flavorful cuisine. Rajasthani dishes like Dal Baati Churma, Gatte Ki
        Sabzi, and Laal Maas are must-tries. The city's sweet treats, such as
        Ghewar, are especially popular during the festive season.
      </Text>

      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        Visitors can enjoy traditional Rajasthani thalis at local restaurants or
        experience fine dining at heritage hotels that offer authentic
        Rajasthani flavors combined with modern presentations.
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.subtitle }]}>
        Modern Jaipur
      </Text>
      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        In addition to its historic landmarks, Jaipur is rapidly modernizing,
        with new developments in infrastructure, shopping malls, and luxury
        hotels. Yet, the city strikes a balance between preserving its royal
        past and embracing the future.
      </Text>

      <Text style={[styles.paragraph, { color: theme.colors.paragraph }]}>
        From its bustling markets filled with traditional handicrafts, textiles,
        and gemstones to its luxurious palaces and forts, Jaipur offers an
        unforgettable blend of history, culture, and modernity.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});
