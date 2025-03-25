import React from 'react';

const IntroScreen = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8 fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          ４脳診断ツール
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          あなたの脳タイプを診断し、仕事・恋愛・人間関係に活かしましょう
        </p>
        <div className="border-b-2 w-24 mx-auto my-6 border-blue-500"></div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">４脳分類とは？</h2>
        <p className="mb-4 text-gray-700">
          ４脳分類は、人間の思考・行動パターンを4つの根源的な欲求傾向に分類する心理分析法です。
          あなたの脳のどの部分が最も活発に働いているかを分析し、それぞれのタイプに応じた強みや適性を明らかにします。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
            <h3 className="font-semibold text-red-700">支配者（爬虫類脳）</h3>
            <p className="text-sm text-gray-700">損得を重視し、競争心や成功欲求が強いタイプ</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
            <h3 className="font-semibold text-yellow-700">遊戯者（哺乳類脳）</h3>
            <p className="text-sm text-gray-700">人間関係や調和を重視し、共感力が高いタイプ</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-700">観察者（人間脳・論理）</h3>
            <p className="text-sm text-gray-700">論理性や客観性を重視し、分析力に優れたタイプ</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-md border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-700">求道者（人間脳・抽象）</h3>
            <p className="text-sm text-gray-700">理想や抽象的な価値観を追求する創造的なタイプ</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">診断のメリット</h2>
        <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
          <li>あなたに合った<span className="font-medium">仕事の選び方</span>がわかる</li>
          <li>相性の良い<span className="font-medium">パートナー選び</span>に役立つ</li>
          <li>対人関係での<span className="font-medium">コミュニケーション改善</span>につながる</li>
          <li>自分の<span className="font-medium">強みと弱み</span>を理解し、成長につなげられる</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center fade-in">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">診断について</h2>
        <div className="flex justify-center items-center space-x-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 text-xl font-semibold">5分</span>
            </div>
            <span className="text-sm text-gray-600">所要時間</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-green-600 text-xl font-semibold">30問</span>
            </div>
            <span className="text-sm text-gray-600">質問数</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-purple-600 text-xl font-semibold">無料</span>
            </div>
            <span className="text-sm text-gray-600">料金</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          質問に答えるだけで、あなたの最優先脳タイプを診断します。
          回答の確信度も設定でき、より精度の高い診断結果を得られます。
        </p>
        
        <button 
          onClick={onStart} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
        >
          診断スタート
        </button>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        <p>© 2025 4脳診断ツール (Windsurf版)</p>
      </div>
    </div>
  );
};

export default IntroScreen;
