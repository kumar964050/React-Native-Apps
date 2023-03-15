import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Header = ({score, topScore}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerIcon}>Emoji Game</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Score :{score}</Text>
        <Text style={styles.score}>Top Score :{topScore}</Text>
      </View>
    </View>
  );
};

let arr = [];
const getNum = () => {
  const n = Math.floor(Math.random() * 12);
  if (arr.includes(n)) {
    return getNum();
  }
  arr.push(n);
  return n;
};

const getRandomNum = () => {
  const emoji = [
    {
      id: 1,
      emoji: '🤕',
    },
    {
      id: 2,
      emoji: '🤫',
    },
    {
      id: 3,
      emoji: '😷',
    },
    {
      id: 4,
      emoji: '😆',
    },
    {
      id: 5,
      emoji: '🤗',
    },
    {
      id: 6,
      emoji: '😉',
    },
    {
      id: 7,
      emoji: '🤭',
    },
    {
      id: 8,
      emoji: '🥺',
    },
    {
      id: 9,
      emoji: '😍',
    },
    {
      id: 10,
      emoji: '🥰',
    },
    {
      id: 11,
      emoji: '😎',
    },
    {
      id: 12,
      emoji: '🤮',
    },
  ];
  const newArr = [];
  for (let index = 0; index < 12; index++) {
    newArr.push(emoji[getNum()]);
  }
  return newArr;
};

export default function App() {
  const [isScreen, setIsScreen] = useState('start');
  const [score, setScore] = useState(0);
  const [topScore, setTopSCore] = useState(0);
  const [selectedVal, setSelectedVal] = useState([]);

  const handlePick = id => {
    if (!selectedVal.includes(id)) {
      setScore(score + 1);
      setSelectedVal([...selectedVal, id]);
    } else {
      if (score > topScore) {
        setTopSCore(score);
      }
      setIsScreen('game-over');
    }
  };

  const emoji = getRandomNum();
  arr = [];

  if (score === 12) {
    setIsScreen('game-over');
  }

  const StartSCreen = () => {
    return (
      <View style={styles.emojiContainer}>
        <View style={styles.emojiCard}>
          {emoji.map(each => (
            <Pressable key={each.id} onPress={() => handlePick(each.id)}>
              <View style={styles.emojiEachCard}>
                <Text style={styles.emoji}>{each.emoji}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  const GameOver = () => {
    return (
      <View style={styles.gameOver}>
        <Image
          style={styles.gameOverImg}
          source={{
            uri:
              score === 12
                ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png',
          }}
        />
        <View style={styles.gameOverCard}>
          <Text style={styles.gameOverTitle}>
            You{score === 12 ? ' Won' : ' Loss'}
          </Text>
          <Text style={styles.gameOverTitle}>
            {score === 12 ? 'Best Score' : 'Score'}
          </Text>
          <Text style={styles.finalScore}>{score}/12</Text>
          <TouchableOpacity
            onPress={() => {
              setScore(0);
              setTopSCore(topScore);
              setIsScreen('start');
              setSelectedVal([]);
              arr = [];
            }}>
            <Text style={styles.playAgain}>Play again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderScreen = () => {
    switch (isScreen) {
      case 'start':
        return <StartSCreen />;
      case 'game-over':
        return <GameOver />;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <Header score={score} topScore={topScore} />
      {/* render emoji here */}
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#9796f0',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff33',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  score: {
    color: 'white',
    marginHorizontal: 5,
    fontWeight: 500,
  },
  emojiContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  emojiEachCard: {
    backgroundColor: '#ffffff33',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  emoji: {
    fontSize: 38,
    padding: 15,
    color: 'black',
  },
  gameOver: {
    height: '90%',
    backgroundColor: '#fff33',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverImg: {
    width: 200,
    height: 200,
    padding: 50,
  },
  gameOverCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  gameOverTitle: {
    color: 'white',
    fontSize: 28,
  },
  finalScore: {
    color: 'blue',
    fontSize: 30,
  },
  playAgain: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#ffce27',
    fontWeight: 600,
    marginTop: 10,
  },
});
