import { useEffect, useMemo, useState } from 'react';

const START_DATE = new Date('2026-06-23T15:00:00');

function getTimeParts(now = new Date()) {
  const diffInSeconds = Math.max(0, Math.floor((now - START_DATE) / 1000));

  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return { days, hours, minutes, seconds };
}

function getPosition (distance) {
  if (distance < 77_000_000) {
    return [
      "To predstavuje vzdialenosť stále menšiu ako je medzi zemou a merkúrom.",
      "Ale za to viacej jak medzi nami a frajerkami.",
      "AENE"
    ];
  }

  if (distance < 170_000_000) {
    return [
      "Práve míňame Merkúr a smerujeme k Venuši.",
      "Prešli sme určite už 733333333 futbalových ihrísk.",
      "HAALAND HAAALAND"
    ];
  }

  if (distance < 225_000_000) {
    return [
      "Sme približne pri Venuši.",
      "Opaaa",
      "Sme skoro na dĺžke mojich schopností vibe kódiť."
    ];
  }

  if (distance < 778_000_000) {
    return [
      "Smerujeme k Marsu.",
      "Budeme tam skorej jak Elon?",
      "Napíš do komentárov."
    ];
  }

  if (distance < 1_430_000_000) {
    return [
      "Opustili sme vnútorné planéty a letíme k Jupiteru.",
      "Celkom štreka.",
      "Možno by som aj nabil jedno oslavné, AENE."
    ];
  }

  if (distance < 2_870_000_000) {
    return [
      "Sme na ceste k Saturnu.",
      "Už ani neviem, čo je to nikotín.",
      "Hilfe hilfe"
    ];
  }

   if (distance < 4_500_000_000) {
    return [
      "Smerujeme k Uránu.",
      "Žiadne anal joky, na to sme tu už moc dlho.",
      "Stále kratšie, jak Marek bez Zuzy, teda, čo ? Bahaha"
    ];
  }

  if (distance < 5_900_000_000) {
    return [
      "Blížime sa k Neptúnu.",
      "Už mi dochádzajú vety na písanie.",
      "Snáď mi zrúbu server, dokiaľ sa dostaneme sem."
    ];
  }

  return [
      "Dorazili sme až za Pluto 🚀",
      "Som ochotný povedať ...",
      "... že už asi nenabijem nikdy."
    ];
};

function App() {
  const [isRunning, setIsRunning] = useState(true);
  const [time, setTime] = useState(() => getTimeParts());
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setTime(getTimeParts());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);
  
  const distance = useMemo(() => {
    const { days, hours, minutes, seconds } = time;
    return Math.floor((days * 86400 + hours * 3600 + minutes * 60 + seconds) * 15.4);
  }, [time]);
  const position = useMemo(() => getPosition(distance), [distance]);
  useEffect(() => {
    if (!position.length) return;
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setSentenceIndex(prev => (prev + 1) % position.length);
        setFade(false);
      }, 1000);
    }, 10000);
    return () => clearInterval(interval);
  }, [position.length]);

  const statusMessage = useMemo(() => {
    return `Ak to prepočítame na rýchlosť Voyager-a 2, tak to je ${distance} kilometrová cesta.`;
  }, [distance]);

  const countdownSummary = useMemo(() => {
    const { days, hours, minutes, seconds } = time;

    return `Domino a Marek sú bez žuvaku už ${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }, [time]);

  return (
    <main className="page-shell">
      <div className="starfield" aria-hidden="true">
        {[
          { left: '8%', top: '14%', size: 1.8, duration: 16, delay: 0 },
          { left: '16%', top: '32%', size: 1.2, duration: 20, delay: 1.4 },
          { left: '24%', top: '10%', size: 2.4, duration: 18, delay: 2.8 },
          { left: '34%', top: '58%', size: 1.1, duration: 24, delay: 4.2 },
          { left: '42%', top: '20%', size: 1.6, duration: 19, delay: 5.1 },
          { left: '52%', top: '74%', size: 1.3, duration: 21, delay: 6.4 },
          { left: '60%', top: '36%', size: 2.1, duration: 17, delay: 7.8 },
          { left: '68%', top: '12%', size: 1.5, duration: 22, delay: 9.1 },
          { left: '76%', top: '64%', size: 1.7, duration: 20, delay: 10.6 },
          { left: '84%', top: '28%', size: 1.2, duration: 25, delay: 11.9 },
          { left: '12%', top: '86%', size: 1.4, duration: 18, delay: 13.2 },
          { left: '28%', top: '48%', size: 1.9, duration: 23, delay: 14.5 },
          { left: '46%', top: '88%', size: 1.1, duration: 26, delay: 15.7 },
          { left: '58%', top: '18%', size: 2.2, duration: 19, delay: 16.9 },
          { left: '70%', top: '82%', size: 1.3, duration: 21, delay: 18.2 },
          { left: '88%', top: '54%', size: 1.8, duration: 17, delay: 19.4 },
          { left: '6%', top: '66%', size: 1.6, duration: 24, delay: 20.8 },
          { left: '22%', top: '22%', size: 1.2, duration: 20, delay: 22.1 },
          { left: '38%', top: '40%', size: 2.0, duration: 18, delay: 23.4 },
          { left: '64%', top: '26%', size: 1.4, duration: 25, delay: 24.7 },
          { left: '80%', top: '80%', size: 1.7, duration: 19, delay: 26.0 },
          { left: '92%', top: '42%', size: 1.1, duration: 22, delay: 27.3 },
          { left: '18%', top: '72%', size: 1.8, duration: 23, delay: 28.6 },
          { left: '50%', top: '46%', size: 1.5, duration: 21, delay: 29.9 },
          { left: '74%', top: '22%', size: 1.3, duration: 17, delay: 31.2 },
          { left: '90%', top: '14%', size: 1.6, duration: 20, delay: 32.5 },
          { left: '30%', top: '84%', size: 1.2, duration: 24, delay: 33.8 },
          { left: '62%', top: '64%', size: 2.3, duration: 18, delay: 35.1 },
          { left: '10%', top: '44%', size: 1.4, duration: 19, delay: 0.8 },
          { left: '20%', top: '78%', size: 1.0, duration: 21, delay: 2.2 },
          { left: '32%', top: '16%', size: 2.1, duration: 17, delay: 3.6 },
          { left: '44%', top: '62%', size: 1.2, duration: 24, delay: 5.0 },
          { left: '56%', top: '30%', size: 1.8, duration: 20, delay: 6.3 },
          { left: '66%', top: '70%', size: 1.3, duration: 22, delay: 7.7 },
          { left: '78%', top: '18%', size: 2.0, duration: 18, delay: 9.0 },
          { left: '86%', top: '74%', size: 1.5, duration: 23, delay: 10.4 },
          { left: '14%', top: '54%', size: 1.1, duration: 26, delay: 11.8 },
          { left: '26%', top: '88%', size: 1.6, duration: 19, delay: 13.1 },
          { left: '40%', top: '34%', size: 2.2, duration: 18, delay: 14.4 },
          { left: '54%', top: '16%', size: 1.3, duration: 25, delay: 15.8 },
          { left: '68%', top: '48%', size: 1.7, duration: 21, delay: 17.1 },
          { left: '82%', top: '90%', size: 1.2, duration: 24, delay: 18.5 },
          { left: '94%', top: '58%', size: 1.4, duration: 20, delay: 19.8 },
          { left: '4%', top: '24%', size: 1.8, duration: 22, delay: 21.2 },
          { left: '18%', top: '92%', size: 1.0, duration: 27, delay: 22.5 },
          { left: '36%', top: '76%', size: 1.9, duration: 19, delay: 23.9 },
          { left: '48%', top: '8%', size: 1.2, duration: 23, delay: 25.2 },
          { left: '72%', top: '38%', size: 2.1, duration: 17, delay: 26.6 },
          { left: '88%', top: '24%', size: 1.5, duration: 21, delay: 27.9 },
          { left: '96%', top: '82%', size: 1.1, duration: 25, delay: 29.3 },
          { left: '34%', top: '96%', size: 1.6, duration: 20, delay: 30.6 },
          { left: '58%', top: '42%', size: 1.4, duration: 18, delay: 31.9 },
          { left: '76%', top: '68%', size: 2.3, duration: 16, delay: 33.2 },
          { left: '92%', top: '6%', size: 1.3, duration: 24, delay: 34.6 },
          { left: '96%', top: '32%', size: 1.0, duration: 21, delay: 0.4 },
          { left: '98%', top: '50%', size: 1.1, duration: 22, delay: 1.7 },
          { left: '97%', top: '72%', size: 1.2, duration: 20, delay: 3.1 },
          { left: '95%', top: '88%', size: 1.0, duration: 24, delay: 4.5 },
          { left: '99%', top: '12%', size: 1.3, duration: 19, delay: 5.8 },
          { left: '97%', top: '64%', size: 1.4, duration: 18, delay: 7.2 },
          { left: '96%', top: '40%', size: 1.1, duration: 23, delay: 8.6 },
          { left: '98%', top: '84%', size: 1.2, duration: 21, delay: 10.0 },
          { left: '99%', top: '22%', size: 1.0, duration: 25, delay: 11.4 },
          { left: '97%', top: '56%', size: 1.3, duration: 20, delay: 12.8 },
          { left: '95%', top: '76%', size: 1.1, duration: 22, delay: 14.2 },
          { left: '33%', top: '64%', size: 1.4, duration: 18, delay: 7.2 },
          { left: '92%', top: '40%', size: 1.1, duration: 23, delay: 8.6 },
          { left: '18%', top: '84%', size: 1.2, duration: 21, delay: 10.0 },
          { left: '12%', top: '22%', size: 2.0, duration: 25, delay: 11.4 },
          { left: '75%', top: '56%', size: 1.3, duration: 20, delay: 12.8 },
          { left: '21%', top: '76%', size: 4.1, duration: 22, delay: 14.2 },
          { left: '66%', top: '64%', size: 1.4, duration: 18, delay: 7.2 },
          { left: '7%', top: '40%', size: 1.1, duration: 23, delay: 8.6 },
          { left: '92%', top: '84%', size: 2.2, duration: 21, delay: 10.0 },
          { left: '66%', top: '22%', size: 1.0, duration: 12, delay: 11.4 },
          { left: '54%', top: '56%', size: 3.3, duration: 15, delay: 8.8 },
          { left: '32%', top: '76%', size: 1.1, duration: 22, delay: 14.2 },
          { left: '90%', top: '8%', size: 4.0, duration: 15, delay: 0.2 },
          { left: '94%', top: '12%', size: 3.2, duration: 16, delay: 1.0 },
          { left: '88%', top: '16%', size: 2.6, duration: 17, delay: 1.8 },
          { left: '92%', top: '20%', size: 2.3, duration: 18, delay: 2.7 },
          { left: '96%', top: '6%', size: 3.8, duration: 14, delay: 3.5 },
          { left: '86%', top: '10%', size: 2.8, duration: 16, delay: 4.3 },
          { left: '90%', top: '24%', size: 2.0, duration: 19, delay: 5.1 },
          { left: '95%', top: '18%', size: 2.4, duration: 17, delay: 6.0 },
          { left: '88%', top: '26%', size: 1.8, duration: 20, delay: 6.9 },
          { left: '93%', top: '30%', size: 1.7, duration: 21, delay: 7.8 },
          { left: '101%', top: '8%', size: 1.8, duration: 18, delay: 0.6 },
          { left: '102%', top: '18%', size: 1.2, duration: 20, delay: 1.3 },
          { left: '103%', top: '28%', size: 2.2, duration: 17, delay: 2.1 },
          { left: '104%', top: '38%', size: 1.4, duration: 22, delay: 2.9 },
          { left: '105%', top: '48%', size: 1.9, duration: 19, delay: 3.7 },
          { left: '106%', top: '58%', size: 1.1, duration: 24, delay: 4.5 },
          { left: '107%', top: '68%', size: 2.4, duration: 16, delay: 5.4 },
          { left: '108%', top: '78%', size: 1.3, duration: 21, delay: 6.2 },
          { left: '109%', top: '88%', size: 1.7, duration: 18, delay: 7.0 },
          { left: '110%', top: '14%', size: 2.8, duration: 15, delay: 7.8 },
          { left: '111%', top: '24%', size: 1.5, duration: 20, delay: 8.6 },
          { left: '112%', top: '34%', size: 2.0, duration: 17, delay: 9.4 },
          { left: '113%', top: '44%', size: 1.6, duration: 23, delay: 10.2 },
          { left: '114%', top: '54%', size: 1.0, duration: 25, delay: 11.0 },
          { left: '115%', top: '64%', size: 2.1, duration: 16, delay: 11.8 },
          { left: '116%', top: '74%', size: 1.8, duration: 19, delay: 12.6 },
          { left: '117%', top: '84%', size: 1.4, duration: 22, delay: 13.4 },
          { left: '118%', top: '94%', size: 2.6, duration: 14, delay: 14.2 },
          { left: '122%', top: '6%', size: 4.4, duration: 16, delay: 0.2 },
          { left: '124%', top: '16%', size: 3.6, duration: 17, delay: 0.9 },
          { left: '126%', top: '28%', size: 4.8, duration: 15, delay: 1.7 },
          { left: '128%', top: '42%', size: 3.1, duration: 18, delay: 2.5 },
          { left: '130%', top: '56%', size: 5.0, duration: 14, delay: 3.3 },
          { left: '132%', top: '70%', size: 3.8, duration: 16, delay: 4.1 },
          { left: '134%', top: '84%', size: 4.2, duration: 15, delay: 4.9 },
          { left: '136%', top: '12%', size: 2.9, duration: 20, delay: 5.7 },
          { left: '138%', top: '24%', size: 3.3, duration: 18, delay: 6.5 },
          { left: '140%', top: '36%', size: 2.6, duration: 21, delay: 7.3 },
          { left: '142%', top: '48%', size: 4.1, duration: 17, delay: 8.1 },
          { left: '144%', top: '60%', size: 3.4, duration: 19, delay: 8.9 },
          { left: '146%', top: '74%', size: 2.7, duration: 22, delay: 9.7 },
          { left: '148%', top: '88%', size: 3.9, duration: 16, delay: 10.5 }
        ].map((star, index) => (
          <span
            key={index}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      <section className="scene">
        <div className="headline-block">
          <h1>{countdownSummary}</h1>
        </div>
        
        <div className="rocket-container">
          <div className="rocketWrapper top">
            <img
            className="rocket-image rocket1"
            src="/images/brh1.png"
            alt="Dominova raketa"/>
          </div>
          <div className="rocketWrapper bottom">
              <img
              className="rocket-image rocket2"
              src="/images/brh2.png"
              alt="Marekova raketa"/>
          </div>
        </div>
        <p className="status-text">{statusMessage}</p>
       <p className={`status-text special ${fade ? "fade" : ""}`}>{position[sentenceIndex]}</p>
      </section>
    </main>
  );
}

export default App;
