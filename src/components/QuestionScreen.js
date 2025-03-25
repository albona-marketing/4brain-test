import React, { useState, useEffect } from 'react';
import { getAllQuestions, getQuestionsByCategory } from '../data/questions';

const QuestionScreen = ({ 
  onSaveAnswer, 
  onComplete, 
  answers,
  globalConfidence,
  updateGlobalConfidence,
  confidenceMode,
  toggleConfidenceMode,
  questionConfidence,
  setConfidence
}) => {
  // 質問データの読み込み
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [questionsPerPage] = useState(5); // 1ページあたりの質問数
  
  // 質問の読み込み
  useEffect(() => {
    // メインカテゴリの質問を読み込む
    const mainQuestions = getQuestionsByCategory('main');
    // 内向/外向の質問を読み込む
    const orientationQuestions = getQuestionsByCategory('orientation');
    // 求道者スタイルの質問を読み込む
    const seekerStyleQuestions = getQuestionsByCategory('seekerStyle');
    
    // すべての質問をページごとにグループ化
    setAllQuestions([
      ...mainQuestions,
      ...orientationQuestions,
      ...seekerStyleQuestions
    ]);
  }, []);

  // 現在表示すべき質問のリスト
  const currentQuestions = allQuestions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  // ページ総数
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);

  // 次のページに進む
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    } else {
      // 最後のページなら診断完了
      onComplete();
    }
  };

  // 前のページに戻る
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  // 回答の保存
  const handleAnswer = (questionId, value) => {
    onSaveAnswer(questionId, value);
  };

  // 確信度の設定
  const handleConfidenceChange = (questionId, value) => {
    setConfidence(questionId, value);
  };

  // 確信度モードの切り替え
  const handleConfidenceModeToggle = () => {
    toggleConfidenceMode(confidenceMode === 'global' ? 'individual' : 'global');
  };

  // 回答率を計算
  const calculateProgress = () => {
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / allQuestions.length) * 100);
  };

  // 次へ進むボタンの表示条件
  const canProceed = () => {
    // 現在のページの質問がすべて回答されているか
    const currentQuestionsAnswered = currentQuestions.every(q => answers[q.id] !== undefined);
    
    return currentQuestionsAnswered;
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">４脳診断テスト</h1>
        <p className="text-gray-600">
          各質問に対してあなたにどれくらい当てはまるかを選んでください
        </p>
      </div>

      {/* 進捗バー */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>進捗状況</span>
          <span>{calculateProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>質問 {currentPage * questionsPerPage + 1}-{Math.min((currentPage + 1) * questionsPerPage, allQuestions.length)} / {allQuestions.length}</span>
          <span>ページ {currentPage + 1} / {totalPages}</span>
        </div>
      </div>

      {/* 確信度設定パネル */}
      <div className="confidence-panel mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">回答の確信度設定</h2>
        
        {/* モード切替スイッチ */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">設定モード:</span>
          <div className="relative inline-block w-48">
            <div className="flex rounded-md border border-gray-300 p-1">
              <button
                className={`flex-1 py-1 px-2 rounded-md text-sm transition ${
                  confidenceMode === 'global' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => toggleConfidenceMode('global')}
              >
                一括設定
              </button>
              <button
                className={`flex-1 py-1 px-2 rounded-md text-sm transition ${
                  confidenceMode === 'individual' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => toggleConfidenceMode('individual')}
              >
                個別設定
              </button>
            </div>
          </div>
        </div>
        
        {/* グローバル確信度スライダー（一括設定モード時のみ表示） */}
        {confidenceMode === 'global' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              すべての質問に対する確信度: {globalConfidence}
            </label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">低</span>
              <input
                type="range"
                min="1"
                max="5"
                value={globalConfidence}
                onChange={(e) => updateGlobalConfidence(parseInt(e.target.value))}
                className="slider flex-grow"
              />
              <span className="text-xs text-gray-500 ml-2">高</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              確信度が高いほど、その回答が診断結果に強く影響します
            </p>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          <p>確信度について:</p>
          <ul className="list-disc list-inside text-xs mt-1 space-y-1">
            <li>高い確信度 = 自分の回答に自信がある</li>
            <li>低い確信度 = 選択に迷いがある、あまり確信が持てない</li>
            <li>個別設定モードでは、特定の質問だけ確信度を変更できます</li>
          </ul>
        </div>
      </div>

      {/* 質問リスト */}
      <div className="space-y-8 mb-8">
        {currentQuestions.map((question) => (
          <div key={question.id} className="bg-white rounded-lg shadow-md p-5 fade-in">
            <p className="text-lg font-medium mb-4 text-gray-800">{question.text}</p>
            
            {/* 5段階評価 */}
            <div className="mb-4">
              <div className="grid grid-cols-5 gap-1 text-center mb-2">
                <div className="text-xs">全く当てはまらない</div>
                <div className="text-xs">あまり当てはまらない</div>
                <div className="text-xs">どちらとも言えない</div>
                <div className="text-xs">やや当てはまる</div>
                <div className="text-xs">非常に当てはまる</div>
              </div>
              
              <div className="grid grid-cols-5 gap-1">
                {[0, 1, 2, 3, 4].map((value) => (
                  <label key={value} className="radio-option flex flex-col items-center">
                    <input
                      type="radio"
                      name={question.id}
                      value={value}
                      checked={answers[question.id] === value}
                      onChange={() => handleAnswer(question.id, value)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                  </label>
                ))}
              </div>
            </div>
            
            {/* 個別確信度設定（個別設定モードの場合のみ表示） */}
            {confidenceMode === 'individual' && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <label className="block text-sm text-gray-700 mb-1">
                  この質問の確信度: {questionConfidence[question.id] || 3}
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">低</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={questionConfidence[question.id] || 3}
                    onChange={(e) => handleConfidenceChange(question.id, parseInt(e.target.value))}
                    className="slider flex-grow"
                  />
                  <span className="text-xs text-gray-500 ml-2">高</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            currentPage === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          前へ
        </button>
        
        <button
          onClick={nextPage}
          disabled={!canProceed()}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            !canProceed()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : currentPage === totalPages - 1
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentPage === totalPages - 1 ? '診断結果を見る' : '次へ'}
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;
