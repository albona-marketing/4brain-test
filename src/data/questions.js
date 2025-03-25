// 質問データ
const questions = [
  // 支配者（爬虫類脳）を見極める質問
  {
    id: 'ruler_1',
    text: '人間関係が多少悪化しても、損することは絶対に避けたいと思う',
    type: 'ruler', // 支配者
    category: 'main'
  },
  {
    id: 'ruler_2',
    text: '競争があると燃えるタイプだ',
    type: 'ruler',
    category: 'main'
  },
  {
    id: 'ruler_3',
    text: '勝ち負けに強くこだわるところがある',
    type: 'ruler',
    category: 'main'
  },
  {
    id: 'ruler_4',
    text: '損得勘定をするのは当たり前で、むしろ得を狙いたい',
    type: 'ruler',
    category: 'main'
  },
  {
    id: 'ruler_5',
    text: '短期的に苦労してでも、最終的に自分が勝てればOKだ',
    type: 'ruler',
    category: 'main'
  },
  {
    id: 'ruler_6',
    text: '周囲の反対より、自分が優位に立つことを優先する',
    type: 'ruler',
    category: 'main'
  },
  {
    id: 'ruler_7',
    text: 'お金や物質的成功には強いモチベーションを感じる',
    type: 'ruler',
    category: 'main'
  },
  {
    id: 'ruler_8',
    text: '手段を選ばず成果を取りに行くシーンがあっても構わない',
    type: 'ruler',
    category: 'main'
  },

  // 遊戯者（哺乳類脳）を見極める質問
  {
    id: 'player_1',
    text: '周りから嫌われるより損するほうがマシだと感じる',
    type: 'player', // 遊戯者
    category: 'main'
  },
  {
    id: 'player_2',
    text: '皆でワイワイ盛り上がるときが一番楽しい',
    type: 'player',
    category: 'main'
  },
  {
    id: 'player_3',
    text: '場の雰囲気が良くなるなら自分を犠牲にしてもいいと思う',
    type: 'player',
    category: 'main'
  },
  {
    id: 'player_4',
    text: '仲間や家族に好かれている実感があると幸せ',
    type: 'player',
    category: 'main'
  },
  {
    id: 'player_5',
    text: 'つい相手に合わせてしまうが、それは苦にならない',
    type: 'player',
    category: 'main'
  },
  {
    id: 'player_6',
    text: '笑顔や楽しい雰囲気でいることが、自分の活力になる',
    type: 'player',
    category: 'main'
  },
  {
    id: 'player_7',
    text: 'みんなが和気あいあいとしているのが理想だ',
    type: 'player',
    category: 'main'
  },
  {
    id: 'player_8',
    text: '誰かが困っていたら、つい手伝いたくなる',
    type: 'player',
    category: 'main'
  },

  // 観察者（人間脳・論理）を見極める質問
  {
    id: 'observer_1',
    text: '周囲がどれだけ反対しても、筋が通らないと思えば従えない',
    type: 'observer', // 観察者
    category: 'main'
  },
  {
    id: 'observer_2',
    text: 'データや事実がないと納得できない',
    type: 'observer',
    category: 'main'
  },
  {
    id: 'observer_3',
    text: '論理的に説明してもらえないとモヤモヤする',
    type: 'observer',
    category: 'main'
  },
  {
    id: 'observer_4',
    text: '大人数の場や同調圧力に苦手意識がある',
    type: 'observer',
    category: 'main'
  },
  {
    id: 'observer_5',
    text: '自分で調べて情報を集めるのが好き・得意',
    type: 'observer',
    category: 'main'
  },
  {
    id: 'observer_6',
    text: '他人にあまり干渉されたくないと感じることが多い',
    type: 'observer',
    category: 'main'
  },
  {
    id: 'observer_7',
    text: '客観的な視点を持つほうだと言われる',
    type: 'observer',
    category: 'main'
  },
  {
    id: 'observer_8',
    text: '感情的な議論よりも、理路整然とした話し合いを好む',
    type: 'observer',
    category: 'main'
  },

  // 求道者（人間脳・抽象）を見極める質問
  {
    id: 'seeker_1',
    text: '現実的な損得よりも"理想の実現"を優先したい',
    type: 'seeker', // 求道者
    category: 'main'
  },
  {
    id: 'seeker_2',
    text: '自分の世界観やビジョンを何より大切にしている',
    type: 'seeker',
    category: 'main'
  },
  {
    id: 'seeker_3',
    text: '周囲の評価よりも"こうあるべき"という想いが強い',
    type: 'seeker',
    category: 'main'
  },
  {
    id: 'seeker_4',
    text: '大きな目標や夢がないとモチベーションが下がる',
    type: 'seeker',
    category: 'main'
  },
  {
    id: 'seeker_5',
    text: '"これを貫きたい"という内なる意志を持っている',
    type: 'seeker',
    category: 'main'
  },
  {
    id: 'seeker_6',
    text: 'たとえ非現実的に見えても、自分にとっては重要なアイデアがある',
    type: 'seeker',
    category: 'main'
  },
  {
    id: 'seeker_7',
    text: '日常生活より、理想や創造の世界に惹かれることが多い',
    type: 'seeker',
    category: 'main'
  },
  {
    id: 'seeker_8',
    text: '抽象的なイメージを思い描いて、それを形にするのが楽しい',
    type: 'seeker',
    category: 'main'
  },

  // 内向／外向の追加質問
  {
    id: 'introvert_1',
    text: '大人数の集まりより、少人数や1人の時間を好む',
    type: 'introvert',
    category: 'orientation'
  },
  {
    id: 'introvert_2',
    text: '新しい人間関係を広げるより、今ある人間関係を大切にしたい',
    type: 'introvert',
    category: 'orientation'
  },
  {
    id: 'introvert_3',
    text: '他者と適度な距離を保たないと疲れることが多い',
    type: 'introvert',
    category: 'orientation'
  },
  {
    id: 'extrovert_1',
    text: '新しい人や場に飛び込むのはワクワクする',
    type: 'extrovert',
    category: 'orientation'
  },
  {
    id: 'extrovert_2',
    text: 'イベントや飲み会で自分が中心になると楽しいと感じる',
    type: 'extrovert',
    category: 'orientation'
  },
  {
    id: 'extrovert_3',
    text: '自分の影響力や活動範囲を広げたいと思うことが多い',
    type: 'extrovert',
    category: 'orientation'
  },

  // 求道者の「陰／陽」判定
  {
    id: 'yang_1',
    text: 'トレンドや他人からの評価も取り込んで、理想を形にしたい',
    type: 'yang', // 陽（ミーハー／ファッション）
    category: 'seekerStyle'
  },
  {
    id: 'yang_2',
    text: '人から"カッコいい""すごい"と思われるのが嬉しい',
    type: 'yang',
    category: 'seekerStyle'
  },
  {
    id: 'yin_1',
    text: '周りに理解されなくても、自分の道をストイックに進みたい',
    type: 'yin', // 陰（修行僧）
    category: 'seekerStyle'
  },
  {
    id: 'yin_2',
    text: 'むしろ孤立しても構わないくらい、自分の理想を貫く',
    type: 'yin',
    category: 'seekerStyle'
  }
];

// 質問のグループを取得するヘルパー関数
export const getQuestionsByType = (type) => {
  return questions.filter(q => q.type === type);
};

// 質問のカテゴリーでグループ化するヘルパー関数
export const getQuestionsByCategory = (category) => {
  return questions.filter(q => q.category === category);
};

// すべての質問を取得
export const getAllQuestions = () => {
  return questions;
};

// 関連質問を取得する関数
// メインの診断が完了した後、追加質問（内向/外向、陰/陽）を取得する
export const getRelatedQuestions = (mainResult) => {
  // すべての人に内向/外向の質問を表示
  const orientationQuestions = getQuestionsByCategory('orientation');
  
  // 求道者タイプの場合のみ、陰/陽の質問も表示
  if (mainResult === 'seeker') {
    return [...orientationQuestions, ...getQuestionsByCategory('seekerStyle')];
  }
  
  return orientationQuestions;
};

export default questions;
