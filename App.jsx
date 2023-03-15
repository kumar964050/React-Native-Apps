import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

function StartScreen({setUIScreen}) {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={{
        uri: 'https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/ocean.jpg',
      }}>
      <View style={styles.mainCard}>
        <Text style={styles.mainTitle}>Tourism</Text>
        <Text style={styles.mainSubTitle}>Plan your Trip.</Text>
        {/* <Button title="Get Start" color={'#25b1cc'} /> */}
        <TouchableOpacity
          onPress={() => {
            setUIScreen('places');
          }}
          style={styles.customButton}>
          <Text style={styles.CustomButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function PlacesScreen({setActiveId, setUIScreen}) {
  return (
    <ImageBackground
      style={styles.placesBackground}
      source={{
        uri: 'https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/towerbg.png',
      }}>
      <View style={styles.padding}>
        {/* title */}
        <View style={styles.backContainer}>
          <Pressable
            onPress={() => {
              setUIScreen('start');
            }}>
            <Text>Back</Text>
          </Pressable>
          <Text style={styles.placesTitle}>Favourite Places</Text>
        </View>

        {/* places cards */}
        <ScrollView>
          {PlacesData.map(each => {
            const {id, title, content, img} = each;
            return (
              <View key={id}>
                <Pressable
                  style={styles.placeCard}
                  onPress={() => {
                    setActiveId(id);
                    setUIScreen('details');
                  }}>
                  <Image
                    style={styles.placeImage}
                    source={{
                      uri: img,
                    }}
                  />
                  <View style={styles.placeCardDetails}>
                    <Text style={styles.placeCardTitle}>{title}</Text>
                    <Text style={styles.placeCardContent}>{content}</Text>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

function DetailsScreen({data, setUIScreen}) {
  const {title, img, paragraph} = data;
  return (
    <ImageBackground
      style={styles.placesBackground}
      source={{
        uri: 'https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/seabg.png',
      }}>
      <View style={styles.padding}>
        {/* title */}
        <View style={styles.backContainer}>
          <Pressable
            onPress={() => {
              setUIScreen('places');
            }}>
            <Text>Back</Text>
          </Pressable>
          <Text style={styles.placesTitle}>Detailed View</Text>
        </View>

        {/* places cards */}
        <View style={styles.PlaceDetail}>
          <Image
            style={styles.detailsImg}
            source={{
              uri: img,
            }}
          />
          <View style={styles.detailCard}>
            <Text style={styles.detailCardTitle}>{title}</Text>
            <Text style={styles.detailCardPara}>{paragraph}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  const [isScreen, setIsScreen] = useState('start');
  const [activeId, setActiveId] = useState('');

  const setUIScreen = id => {
    setIsScreen(id);
  };
  const renderUi = () => {
    switch (isScreen) {
      case 'start':
        return <StartScreen setUIScreen={setUIScreen} />;
      case 'places':
        return (
          <PlacesScreen setActiveId={setActiveId} setUIScreen={setUIScreen} />
        );
      case 'details':
        return (
          <DetailsScreen
            data={PlacesData[activeId - 1]}
            setUIScreen={setUIScreen}
          />
        );

      default:
        break;
    }
  };
  return <SafeAreaView>{renderUi()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainCard: {
    backgroundColor: '#fff',
    height: 200,
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    elevation: 7,
    shadowOffset: {
      height: 2,
      width: 3,
    },
    shadowColor: 'lightgrey',
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  mainTitle: {
    fontSize: 30,
    color: 'black',
    fontWeight: 600,
  },
  mainSubTitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: '#25b1cc',
    borderRadius: 10,
  },
  CustomButtonText: {
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: 600,
  },
  placesBackground: {
    height: '100%',
  },
  padding: {
    padding: 8,
    paddingBottom: 50,
    // marginBottom: 10,
  },
  placesTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 600,
    margin: 5,
  },
  placeCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
  },
  placeImage: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  placeCardDetails: {
    width: '100%',
  },
  placeCardTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 500,
  },
  placeCardContent: {
    fontSize: 13,
    width: '80%',
  },
  PlaceDetail: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  detailsImg: {
    borderRadius: 10,
    height: 250,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  detailCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  detailCardTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 500,
  },
  detailCardPara: {
    color: '#6c6b70',
    fontSize: 13,
  },
});

const PlacesData = [
  {
    id: 1,
    title: 'Taj Mahal',
    paragraph:
      'The Taj Mahal is considered to be the greatest architectural achievement in the whole range of Indo-Islamic architecture. Its recognised architectonic beauty has a rhythmic combination of solids and voids, concave and convex and light shadow; such as arches and domes further increases the aesthetic aspect. Not a piece of architecture, as other buildings are, but the proud passions of an emperor’s love wrought in living stones.',
    content:
      'If there was just one symbol to represent all of India, it would be the Taj Mahal.',
    img: 'https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/tajmahal-img.png',
  },
  {
    id: 2,
    title: 'Golden Temple',
    paragraph:
      'The Golden Temple, also known as Harmandir Sahib is a gurdwara located in the city of Amritsar, Punjab, India. There are many places to visit Near Golden Temple like Jallianwala Bagh, Wagah Border, Harike Wetland, Bathinda Fort.',

    content:
      'Amritsar is world-famous for the beautiful and highly revered Golden Temple',
    img: 'https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/golden-temple-img.png',
  },
  {
    id: 3,
    title: 'Mysore Palace',
    paragraph:
      'Mysore Palace, also called Amba Vilas Palace, is one of the most magnificent and largest palaces in India. Situated in the southern state of Karnataka, it used to be the official residence of the Wodeyar Dynasty, the rulers of Mysore from 1399 to 1950. The grand palace stands tall in the heart of Mysore city and attracts visitors from across the world. Being one of the prime attractions in India after the Taj Mahal, it certainly deserves a place in every traveler’s bucket list.',
    content:
      'The Mysore Palace is a historical palace and the royal residence at Mysore .',
    img: 'https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/mysore-palace-img.png',
  },
  {
    id: 4,
    title: 'Varanasi Temple',
    paragraph:
      'Sri Kashi Vishwanath Temple also known as the Golden Temple, it is dedicated to Lord Shiva, the presiding deity of the city. Varanasi is Said to be the point at which the first jyotirlinga, the fiery pillar of light by which shiva manifested has supremacy over others gods, broke through the Earth’s crust and flared towards the heavens. More than the Gaths and even the Ganga, the Shivalinga installed in the temple remains the devotional focus of Varanasi.',
    content:
      'Varanasi Temple is most famous Hindu temples dedicated to Lord Shiva.',
    img: 'https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/varanasi-temple-img.png',
  },
];
