import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

// 이미지 파일을 import하거나 경로를 설정합니다.
import review1 from './images/review1.png';
import review2 from './images/review2.png';
import review3 from './images/review3.png';
import review4 from './images/review4.png';
import review5 from './images/review5.png';
import review6 from './images/review6.png';
import review7 from './images/review7.png';
import review8 from './images/review8.png';
import review9 from './images/review9.png';

// ReviewCard 컴포넌트 생성
const ReviewCard = ({ image, address, title, starRating, reviewCount, weather, rainfall, skyCondition }) => (


  <div className='grid-item'>
    <img className="grid-review" src={image} alt={title} style={{ width: '220px', height: '220px' }} />
    <p className="review-address">{address}</p>
    <p className="review-title">{title}</p>
    {/* 기온, 강수량, 하늘 상태를 표시합니다 */}
    <p className="weather-info">기온: {weather ? `${weather} ℃` : 'Loading...'}</p>
    <p className="sky-info">하늘 상태: {skyCondition}</p> {/* 흐림/맑음 표시 */}
  </div>

);

const clickToDetail = (index) => {
  console.log("Clicked! Index:", index);
  window.location.href = `./detailpage/${index}`;
}

// 하늘 상태 해석 함수
const getSkyCondition = (skyCode, ptyCode) => {
  if (ptyCode > 0) {
    switch (ptyCode) {
      case '1': return "비";
      case '2': return "비/눈";
      case '3': return "눈";
      case '4': return "소나기";
      default: return "알 수 없음";
    }
  } else {
    switch (skyCode) {
      case '1': return "맑음";
      case '3': return "구름 많음";
      case '4': return "흐림";
      default: return "알 수 없음";
    }
  }
};

const getBaseTime = () => {
  const now = new Date();
  const hours = now.getHours();

  // API 제공 시간에 맞는 시간 배열 (00:00, 03:00, 06:00 등)
  const availableTimes = ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'];

  // 현재 시간에 가장 근접한 base_time을 설정
  let closestTime = availableTimes[0];
  for (let time of availableTimes) {
    if (hours >= parseInt(time.slice(0, 2))) {
      closestTime = time;
    }
  }

  return closestTime;
};

const reviewData = [
  { image: review1, address: '서울시 종로구', title: '경복궁', starRating: 3.5, reviewCount: 15, nx: 60, ny: 127 },
  { image: review2, address: '서울시 용산구', title: '남산 N타워', starRating: 4.2, reviewCount: 15, nx: 60, ny: 126 },
  { image: review3, address: '강원 춘천시 남산면', title: '남이섬', starRating: 3.9, reviewCount: 15, nx: 69, ny: 132 },
  { image: review4, address: '경상북도 경주시 불국로', title: '불국사', starRating: 3.5, reviewCount: 15, nx: 102, ny: 89 },
  { image: review5, address: '강원 양양군 대청봉길', title: '설악산', starRating: 4.7, reviewCount: 15, nx: 85, ny: 139 },
  { image: review6, address: '경기도 수원시 장안구', title: '수원화성', starRating: 4.6, reviewCount: 15, nx: 60, ny: 121 },
  { image: review7, address: '전라북도 전주시 완산구', title: '전주 한옥마을', starRating: 4.8, reviewCount: 15, nx: 63, ny: 89 },
  { image: review8, address: '제주 서귀포시 토평동', title: '한라산', starRating: 4.8, reviewCount: 15, nx: 53, ny: 35 },
  { image: review9, address: '경상북도 포항시 남구', title: '호미곶', starRating: 2.8, reviewCount: 15, nx: 106, ny: 96 },
];

const Home = () => {
  const [weatherData, setWeatherData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [rainfallData, setRainfallData] = useState({}); 
  const [skyData, setSkyData] = useState({}); // SKY 코드 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리

  const fetchWeatherDataForAll = async () => {
    setLoading(true);
    setError(null);

    try {
      // 초단기 실황 (기온, 강수량)
      const ultraSrtResponses = await Promise.all(reviewData.map((review) => {
        return axios.get('https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
          params: {
            serviceKey: 'q67gG37dAhg0kMIi8NXRmK/oaW/bjoakKyt8VIq/QE0IRQAUSOgcmy4+/WiMq5dZGs5Y9k+XqdfByy2mRo41Qw==',
            pageNo: '1',
            numOfRows: '10',
            dataType: 'JSON',
            base_date: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
            base_time: getBaseTime(),
            nx: review.nx,
            ny: review.ny,
          },
        });
      }));

      // 초단기 실황 데이터를 처리
      ultraSrtResponses.forEach((response, index) => {
        const tempData = response.data.response.body.items.item.find(item => item.category === 'T1H') || { obsrValue: 'N/A' };
        setWeatherData(prevState => ({ ...prevState, [index]: tempData.obsrValue }));
      });

      // 단기 예보 (하늘 상태)
      const vilageFcstResponses = await Promise.all(reviewData.map((review) => {
        return axios.get('https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
          params: {
            serviceKey: 'q67gG37dAhg0kMIi8NXRmK/oaW/bjoakKyt8VIq/QE0IRQAUSOgcmy4+/WiMq5dZGs5Y9k+XqdfByy2mRo41Qw==',
            pageNo: '1',
            numOfRows: '10',
            dataType: 'JSON',
            base_date: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
            base_time: getBaseTime(),
            nx: review.nx,
            ny: review.ny,
          },
        });
      }));

      // 단기 예보 데이터를 처리 (하늘 상태)
      vilageFcstResponses.forEach((response, index) => {
        const skyData = response.data.response.body.items.item.find(item => item.category === 'SKY') || { fcstValue: 'N/A' };
        const ptyData = response.data.response.body.items.item.find(item => item.category === 'PTY') || { fcstValue: 0 };

        // SKY 코드와 PTY 코드를 숫자로 출력
        // console.log(`Review ${index} - SKY 코드: ${skyData.fcstValue}, PTY 코드: ${ptyData.fcstValue}`);

        setSkyData(prevState => ({ ...prevState, [index]: getSkyCondition(skyData.fcstValue, ptyData.fcstValue) }));
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('날씨 데이터를 가져오는 중 오류 발생');
      console.error("날씨 데이터를 가져오는 중 오류 발생: ", error);
    }
  };

  useEffect(() => {
    fetchWeatherDataForAll();

    const intervalId = setInterval(() => {
      fetchWeatherDataForAll();
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  // 검색어에 맞게 리뷰 데이터를 필터링하는 함수
  const filteredReviews = reviewData.filter((review) =>
    review.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 발생 시
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='home-container'>
      <div className='search-parent-container'>
        <div className='search-container'>
          <input
            type="text"
            placeholder="장소를 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
      <div className='grid-container'>
        {filteredReviews.map((review, index) => (
          <button 
            id="navigateButton" 
            onClick={() => clickToDetail(index)} 
            key={review.address}  // 고유한 'address'를 key로 사용
          >
            <ReviewCard
              key={review.address}  // ReviewCard에도 고유한 key 설정
              image={review.image}
              address={review.address}
              title={review.title}
              weather={weatherData[index]}
              skyCondition={skyData[index]}
            />
          </button>
        ))}
      </div>
    </div>
  );
  
};

export default Home;
