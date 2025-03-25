import React from 'react';
import { 
  FaTwitter, 
  FaFacebook, 
  FaLine, 
  FaRedo, 
  FaBriefcase, 
  FaHeart, 
  FaUsers 
} from 'react-icons/fa';

const ResultScreen = ({ results, onRestart }) => {
  if (!results) {
    return (
      <div className="text-center py-20">
        <p>結果を計算中...</p>
      </div>
    );
  }

  const { 
    mainTypeData, 
    subTypeData, 
    mainScore,
    subScore,
    orientationData,
    seekerStyleData
  } = results;

  // メインタイプのクラス名を取得
  const getMainTypeClass = () => {
    switch (mainTypeData.id) {
      case 'ruler': return 'ruler-card';
      case 'player': return 'player-card';
      case 'observer': return 'observer-card';
      case 'seeker': return 'seeker-card';
      default: return '';
    }
  };

  // サブタイプのアクセントカラーを取得
  const getSubTypeColor = () => {
    return subTypeData.color;
  };

  // 診断結果タイトルを生成
  const getResultTitle = () => {
    let title = `あなたの最優先脳は『${mainTypeData.name}』です`;
    
    // 内向/外向を追加
    if (orientationData) {
      title += `（${orientationData.name}）`;
    }
    
    // 求道者の場合は陰/陽も追加
    if (mainTypeData.id === 'seeker' && seekerStyleData) {
      title += `（${seekerStyleData.name}）`;
    }
    
    return title;
  };

  // 結果の共有文を作成
  const getShareText = () => {
    return encodeURIComponent(
      `私の４脳診断結果は『${mainTypeData.name}』でした！ #4脳診断 #windsurf`
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          診断結果
        </h1>
        <p className="text-xl text-gray-600">
          あなたの脳タイプが判明しました
        </p>
      </div>

      {/* メインタイプの結果カード */}
      <div className={`result-card ${getMainTypeClass()} mb-8`}>
        <h2 className="text-2xl font-bold mb-4">{getResultTitle()}</h2>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-3">特徴</h3>
            <p className="text-gray-700 mb-4">{mainTypeData.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-1">強み:</h4>
              <p className="text-gray-700">{mainTypeData.strengths}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">弱み:</h4>
              <p className="text-gray-700">{mainTypeData.weaknesses}</p>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-white bg-opacity-70 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">スコア詳細</h3>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>メインタイプ</span>
                  <span className="font-medium">{Math.round(mainScore * 25)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${Math.round(mainScore * 25)}%`,
                      backgroundColor: mainTypeData.color 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>サブタイプ</span>
                  <span className="font-medium">{Math.round(subScore * 25)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${Math.round(subScore * 25)}%`,
                      backgroundColor: getSubTypeColor() 
                    }}
                  ></div>
                </div>
              </div>
              
              {/* 内向/外向情報 */}
              {orientationData && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold mb-1">性格傾向:</h4>
                  <p className="text-sm">{orientationData.name} - {orientationData.description}</p>
                </div>
              )}
              
              {/* 求道者タイプの場合、陰/陽の補足情報 */}
              {mainTypeData.id === 'seeker' && seekerStyleData && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-1 text-purple-800">求道スタイル:</h4>
                  <p className="text-sm">{seekerStyleData.name} - {seekerStyleData.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* アドバイスセクション */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">タイプ別アドバイス</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-70 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaBriefcase className="mr-2 text-blue-600" />
                <h4 className="font-semibold">仕事</h4>
              </div>
              <p className="text-sm text-gray-700">{mainTypeData.advice.work}</p>
            </div>
            
            <div className="bg-white bg-opacity-70 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaHeart className="mr-2 text-red-500" />
                <h4 className="font-semibold">恋愛・人間関係</h4>
              </div>
              <p className="text-sm text-gray-700">{mainTypeData.advice.relationship}</p>
            </div>
            
            <div className="bg-white bg-opacity-70 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaUsers className="mr-2 text-green-600" />
                <h4 className="font-semibold">ライフスタイル</h4>
              </div>
              <p className="text-sm text-gray-700">{mainTypeData.advice.life}</p>
            </div>
          </div>
        </div>
      </div>

      {/* サブタイプの情報 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3">
          サブタイプ: {subTypeData.name}
        </h3>
        <p className="text-gray-700 mb-4">
          あなたは{mainTypeData.name}が最も強い特性ですが、{subTypeData.name}の特性も持ち合わせています。
        </p>
        <div className="text-sm text-gray-600">
          <p className="mb-2">これは以下のような場面で現れることがあります:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>{mainTypeData.name}の特性が強く出る一方で、時に{subTypeData.name}らしい判断をすることも</li>
            <li>ストレス状況下や特定の人間関係の中で、{subTypeData.name}の特性が表れることも</li>
            <li>{subTypeData.name}の強みも活かすことで、より柔軟な対応が可能に</li>
          </ul>
        </div>
      </div>

      {/* シェアと再診断ボタン */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 rounded-lg p-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">診断結果をシェアする</h3>
          <div className="flex space-x-3">
            <a 
              href={`https://twitter.com/intent/tweet?text=${getShareText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-90 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4267B2] text-white p-2 rounded-full hover:opacity-90 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a 
              href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white p-2 rounded-full hover:opacity-90 transition"
            >
              <FaLine size={20} />
            </a>
          </div>
        </div>
        
        <button 
          onClick={onRestart} 
          className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          <FaRedo className="mr-2" /> もう一度診断する
        </button>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>© 2025 4脳診断ツール (Windsurf版)</p>
      </div>
    </div>
  );
};

export default ResultScreen;
