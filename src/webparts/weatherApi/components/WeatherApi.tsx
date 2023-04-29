import * as React from 'react';
import styles from './WeatherApi.module.scss';
import { IWeatherApiProps } from './IWeatherApiProps';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
export interface IWeatherData {
  temperature: string;
  description: string;
}

export interface IWeatherApiState {
  weatherData: IWeatherData | null;
}
export default class WeatherApi extends React.Component<IWeatherApiProps,IWeatherApiState> {
  constructor(props:IWeatherApiProps) {
    super(props);
    this.state = {
      weatherData: null,
    };
  }

  public componentDidMount(): void {
    // Call the weather API
    axios.get('https://api.weatherapi.com/v1/current.json?key=3400108e1e314830b3c145320232904&q=Indore')
      .then((response) => {
        const { temp_c, condition } = response.data.current;
        const weatherData: IWeatherData = {
          temperature: temp_c,
          description: condition.text,
        };
        this.setState({ weatherData });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }
  //Hello world
  public render(): React.ReactElement<IWeatherApiProps> {
    return (
      <div className={styles.weatherApi}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Weather Information</span>
              {this.state.weatherData ? (
                <div>
                  <p>
                    <FontAwesomeIcon icon={faCloud} className={styles.icon} />
                    Temperature: {this.state.weatherData.temperature}°C
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCloud} className={styles.icon} />
                    Description: {this.state.weatherData.description}
                  </p>
                </div>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          </div>
          <h1>hellow world</h1>
          <p>github</p>
        </div>
      </div>
    );
  }
}
