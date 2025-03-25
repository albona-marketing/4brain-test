import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { calculateResults } from './data/resultCalculator';
import './styles/App.css';

function App() {
  // アプリケーションの状態管理
  const [currentScreen, setCurrentScreen] = useState('intro'); // intro, questions, result
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [globalConfidence, setGlobalConfidence] = useState(3); // デフォルトの確信度は3（中間）
  const [confidenceMode, setConfidenceMode] = useState('global'); // global または individual
  const [questionConfidence, setQuestionConfidence] = useState({}); // 個別の質問ごとの確信度

  // 診断開始
  const startDiagnosis = () => {
    setCurrentScreen('questions');
  };

  // 質問への回答を保存
  const saveAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // 質問の確信度を設定
  const setConfidence = (questionId, value) => {
    setQuestionConfidence(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // グローバル確信度を設定
  const updateGlobalConfidence = (value) => {
    setGlobalConfidence(value);
  };

  // 確信度モードを切り替え
  const toggleConfidenceMode = (mode) => {
    setConfidenceMode(mode);
  };

  // 診断を完了し結果を計算
  const completeDiagnosis = () => {
    // 使用する確信度データを決定
    const finalConfidence = confidenceMode === 'global' 
      ? Object.keys(answers).reduce((acc, key) => {
          acc[key] = globalConfidence;
          return acc;
        }, {}) 
      : questionConfidence;
    
    // 結果を計算
    const calculatedResults = calculateResults(answers, finalConfidence);
    setResults(calculatedResults);
    setCurrentScreen('result');
  };

  // 診断をやり直す
  const restartDiagnosis = () => {
    setAnswers({});
    setResults(null);
    setCurrentScreen('intro');
    setGlobalConfidence(3);
    setConfidenceMode('global');
    setQuestionConfidence({});
  };

  // 現在の画面に基づいてコンポーネントをレンダリング
  const renderScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return <IntroScreen onStart={startDiagnosis} />;
      case 'questions':
        return (
          <QuestionScreen
            onSaveAnswer={saveAnswer}
            onComplete={completeDiagnosis}
            answers={answers}
            globalConfidence={globalConfidence}
            updateGlobalConfidence={updateGlobalConfidence}
            confidenceMode={confidenceMode}
            toggleConfidenceMode={toggleConfidenceMode}
            questionConfidence={questionConfidence}
            setConfidence={setConfidence}
          />
        );
      case 'result':
        return <ResultScreen results={results} onRestart={restartDiagnosis} />;
      default:
        return <IntroScreen onStart={startDiagnosis} />;
    }
  };

  return (
    <div className="app-container min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
