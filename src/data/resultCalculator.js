// 診断結果を計算するロジック

import { getQuestionsByType } from './questions';

// タイプ名の定義
export const BRAIN_TYPES = {
  ruler: {
    id: 'ruler',
    name: '支配者（爬虫類脳）',
    description: '損得や勝ち負けを基準に行動し、自分の利益や成功を最優先するタイプです。競争心が強く、物質的な成功や地位向上に強いモチベーションを感じます。',
    color: '#e74c3c',
    strengths: '目標達成力、決断力、リーダーシップ、実行力、危機管理能力',
    weaknesses: '対人関係での衝突、協調性の欠如、長期的な信頼関係構築の難しさ',
    advice: {
      work: '営業、経営者、投資家、競争が求められる職種が適しています。明確な目標設定と報酬体系があると力を発揮できます。',
      relationship: '相手の立場や感情に配慮することを意識しましょう。遊戯者との相性は良好ですが、同じ支配者タイプとは衝突しやすいです。',
      life: '勝負事に「勝つこと」だけでなく、プロセスを楽しむ視点も持つと、より充実した人生になります。'
    }
  },
  player: {
    id: 'player',
    name: '遊戯者（哺乳類脳）',
    description: '人間関係や場の雰囲気を重視し、調和を大切にするタイプです。周囲との良好な関係性が何より重要で、人から好かれることに喜びを感じます。',
    color: '#f39c12',
    strengths: '協調性、共感力、コミュニケーション能力、場の空気を読む力、チームワーク',
    weaknesses: '自己主張の弱さ、周囲への依存、自分の本音を抑えがち',
    advice: {
      work: '接客業、看護師、教師、チームワークが求められる職種が適しています。人間関係が良好な職場環境が重要です。',
      relationship: '自分の意見も適度に主張することを心がけましょう。支配者とは補完関係になりやすく、良好な関係を築けます。',
      life: '他者との関わりを大切にしつつも、自分自身の価値観や意見も尊重することで、バランスのとれた人生を送れます。'
    }
  },
  observer: {
    id: 'observer',
    name: '観察者（人間脳・論理）',
    description: '論理的思考や客観性を重視し、事実やデータに基づいて判断するタイプです。感情に流されるよりも理性的な分析を好みます。',
    color: '#3498db',
    strengths: '分析力、客観性、論理思考、問題解決能力、冷静な判断力',
    weaknesses: '感情表現の苦手さ、共感力の弱さ、孤立しがち',
    advice: {
      work: '研究者、エンジニア、分析家、専門職など、専門知識や論理的思考が求められる職種が適しています。',
      relationship: '相手の感情面にも配慮することを意識しましょう。同じ観察者タイプとは理解し合えますが、遊戯者とは価値観の違いで摩擦が生じることも。',
      life: '論理だけでなく、時には感情や直感も大切にすることで、より豊かな人生体験ができます。'
    }
  },
  seeker: {
    id: 'seeker',
    name: '求道者（人間脳・抽象）',
    description: '理想や抽象的な価値観を追求し、大きなビジョンや夢を持つタイプです。目に見える現実よりも、あるべき姿や理想を重視します。',
    color: '#9b59b6',
    strengths: '創造性、ビジョン構築力、独自性、理想追求力、芸術的センス',
    weaknesses: '現実とのギャップに苦しみやすい、具体的な実行力の弱さ、周囲との価値観の相違',
    advice: {
      work: 'クリエイター、アーティスト、起業家、コンサルタントなど、自分のビジョンを形にできる職種が適しています。',
      relationship: '現実的な視点も取り入れることを心がけましょう。観察者とは互いの視点を補完できますが、支配者とは価値観の衝突が起きやすいです。',
      life: '理想を追求しつつも、現実とのバランスを取ることで、理想を実現する可能性が高まります。'
    }
  }
};

// 内向/外向の定義
export const ORIENTATIONS = {
  introvert: {
    name: '内向型',
    description: '少人数や親密な関係を好み、内省的で自分の時間を大切にします。'
  },
  extrovert: {
    name: '外向型',
    description: '多くの人との交流を好み、社交的で外部からの刺激を求める傾向があります。'
  }
};

// 陰/陽の定義（求道者向け）
export const SEEKER_STYLES = {
  yin: {
    name: '陰型（修行僧型）',
    description: '他者の評価よりも自分の内なる基準を重視し、孤高の理想追求者として自分の道を貫きます。'
  },
  yang: {
    name: '陽型（ミーハー型）',
    description: '外部からの評価や流行も取り入れながら、理想を現実の中で形にしていくタイプです。'
  }
};

// 結果計算関数
export const calculateResults = (answers, confidence) => {
  // 回答がない場合は null を返す
  if (Object.keys(answers).length === 0) return null;

  // 各タイプのスコアを計算
  const scores = {
    ruler: calculateTypeScore('ruler', answers, confidence),
    player: calculateTypeScore('player', answers, confidence),
    observer: calculateTypeScore('observer', answers, confidence),
    seeker: calculateTypeScore('seeker', answers, confidence),
    introvert: calculateTypeScore('introvert', answers, confidence),
    extrovert: calculateTypeScore('extrovert', answers, confidence),
    yin: calculateTypeScore('yin', answers, confidence),
    yang: calculateTypeScore('yang', answers, confidence)
  };

  // メインタイプを決定（最大スコアのタイプ）
  const mainTypeScores = {
    ruler: scores.ruler,
    player: scores.player,
    observer: scores.observer,
    seeker: scores.seeker
  };
  
  const mainType = Object.keys(mainTypeScores).reduce((a, b) => 
    mainTypeScores[a] > mainTypeScores[b] ? a : b
  );

  // サブタイプを決定（メインタイプを除いた中で最大スコアのタイプ）
  const subTypeScores = { ...mainTypeScores };
  delete subTypeScores[mainType];
  
  const subType = Object.keys(subTypeScores).reduce((a, b) => 
    subTypeScores[a] > subTypeScores[b] ? a : b
  );

  // 内向/外向を決定
  const orientation = scores.introvert > scores.extrovert ? 'introvert' : 'extrovert';

  // 求道者の場合のみ、陰/陽も決定
  let seekerStyle = null;
  if (mainType === 'seeker' && (scores.yin > 0 || scores.yang > 0)) {
    seekerStyle = scores.yin > scores.yang ? 'yin' : 'yang';
  }

  // 最終結果を返す
  return {
    mainType,
    mainTypeData: BRAIN_TYPES[mainType],
    mainScore: mainTypeScores[mainType],
    
    subType,
    subTypeData: BRAIN_TYPES[subType],
    subScore: subTypeScores[subType],
    
    allScores: scores,
    
    orientation,
    orientationData: ORIENTATIONS[orientation],
    
    seekerStyle,
    seekerStyleData: seekerStyle ? SEEKER_STYLES[seekerStyle] : null,

    // 回答率（未回答の質問があるかどうかの確認用）
    answerRate: calculateAnswerRate(answers)
  };
};

// 特定タイプの質問に対するスコアを計算する関数
const calculateTypeScore = (type, answers, confidence) => {
  const typeQuestions = getQuestionsByType(type);
  if (typeQuestions.length === 0) return 0;
  
  let totalScore = 0;
  let answeredQuestions = 0;
  
  typeQuestions.forEach(question => {
    if (answers[question.id] !== undefined) {
      // 回答値に確信度を掛け合わせる（確信度が高いほど、その回答の重みが増す）
      const confidenceMultiplier = confidence[question.id] ? confidence[question.id] / 3 : 1;
      totalScore += answers[question.id] * confidenceMultiplier;
      answeredQuestions++;
    }
  });
  
  // 回答された質問がない場合は0を返す
  if (answeredQuestions === 0) return 0;
  
  // 平均スコアを計算（0-4の範囲で正規化）
  return totalScore / answeredQuestions;
};

// 回答率を計算する関数
const calculateAnswerRate = (answers) => {
  const totalQuestions = Object.keys(answers).length;
  const answeredQuestions = Object.values(answers).filter(value => value !== undefined).length;
  
  return answeredQuestions / totalQuestions;
};
