import { Category, Announcement } from './types';

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'news-hikari',
    title: '【サプリ会員限定！光シザー特別価格】',
    link: 'https://fants.jp/feeds/618673?openExternalBrowser=1'
  },
  {
    id: 'news-ribic',
    title: '【理美容品の特別価格】理美容用品の通販『Ribi a Ribi』コラボ',
    link: 'https://fants.jp/feeds/920097?openExternalBrowser=1'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'core-phase',
    title: 'CORE PHASE',
    subtitle: '技術の核となる理論',
    description: '全てのデザインの基礎となるカット理論と、ハサミ・コームの扱い方など、美容師としての土台を作る必須カリキュラム。',
    styles: [
      {
        id: 'design-reading',
        name: 'デザインの読み解き方',
        description: 'スタイル写真から構造を理解し、展開図に落とし込むための分析力を養う講義。',
        externalUrl: 'https://fants.jp/feeds/833145?openExternalBrowser=1',
        date: '2024.03.25',
        points: [
           { id: 'p1', title: '構造分析', description: 'アウトライン、ウェイト、レイヤーの入り方を視覚的に分解する。' }
        ]
      },
      {
        id: 'blocking-concept',
        name: 'ブロッキングの考え方',
        description: 'デザインを正確に作るためのセクション分けとスライスの基礎理論。',
        externalUrl: 'https://fants.jp/feeds/593952?openExternalBrowser=1',
        date: '2023.12.01',
        points: [
          { id: 'p1', title: '骨格の理解', description: '頭の丸みや生え癖を理解し、展開図通りのセクションを取る。' }
        ]
      },
      {
        id: 'finger-gym-comb',
        name: 'コームを正しく持つための指の体操',
        description: 'コーム操作の基礎となる、指の独立した動きと柔軟性を養うトレーニング。',
        externalUrl: 'https://fants.jp/feeds/1084383?openExternalBrowser=1',
        date: '2024.01.15',
        points: [
          { id: 'p1', title: '指の独立性', description: '小指・薬指・中指・人差し指がそれぞれ独立して動く感覚を養う。' },
          { id: 'p2', title: 'グリップの安定', description: 'コームを持ち替える際も、支点となる指がブレないように意識する。' }
        ]
      },
      {
        id: 'right-hand-gym',
        name: 'シザーを持つ右手の体操',
        description: '開閉の安定性を高め、腱鞘炎を防ぐための右手のエクササイズ。',
        externalUrl: 'https://fants.jp/feeds/1084406?openExternalBrowser=1',
        date: '2024.01.15',
        points: [
           { id: 'p1', title: '静刃の固定', description: '親指以外の4本の指で静刃を完全に固定し、動刃のみを動かす感覚を掴む。' }
        ]
      },
      {
        id: 'left-hand-gym',
        name: 'パネルを持つ左手の体操',
        description: '正確なスライスとテンション管理のための左手トレーニング。',
        externalUrl: 'https://fants.jp/feeds/1084410?openExternalBrowser=1',
        date: '2024.01.16',
        points: [
           { id: 'p1', title: '指の密着', description: '指の間に隙間ができないようにし、パネルに対して均一なテンションをかける。' }
        ]
      },
      {
        id: 'scissor-work-gym',
        name: 'シザーワークの体操',
        description: 'リズムと正確性を養うシザー開閉の実践的トレーニング。',
        externalUrl: 'https://fants.jp/feeds/1084421?openExternalBrowser=1',
        date: '2024.01.17',
        points: [
           { id: 'p1', title: '開閉のリズム', description: '一定のリズムで開閉を行い、手首の角度が変わらないように注意する。' }
        ]
      },
      {
        id: 'comb-work-gym',
        name: 'コームワークの体操',
        description: 'スムーズな持ち替えとシェイプを行うためのコーム操作練習。',
        externalUrl: 'https://fants.jp/feeds/1084425?openExternalBrowser=1',
        date: '2024.01.18',
        points: [
           { id: 'p1', title: '回転動作', description: '指先を使ってコームをスムーズに回転させ、シェイプからカットへの移行を円滑にする。' }
        ]
      }
    ]
  },
  {
    id: 'basic',
    title: 'BASIC',
    subtitle: 'サロンワークの標準',
    description: '現場で最も多用されるスタイル構成。ワンレングスからレイヤー、ショートまでを網羅。',
    styles: [
      {
        id: 'one-length',
        name: 'ワンレングス',
        description: '最も基本となる水平ラインの作り方。姿勢・目線・テンション管理の基礎を学ぶ。',
        date: '2023.12.10',
        points: [
           { id: 'p1', title: '姿勢と目線', description: 'カットラインの真正面に体を置き、目線をラインの高さに合わせる。' },
           { id: 'p2', title: 'ノーテンション', description: '髪の自然な落ち位置で切るため、コーミング時のテンションをかけない。' }
        ],
        lessons: [
          { id: 'l1', title: 'ベースカット', url: 'https://fants.jp/feeds/595705?openExternalBrowser=1' },
          { id: 'l2', title: '右サイド', url: 'https://fants.jp/feeds/595728?openExternalBrowser=1' },
          { id: 'l3', title: 'チェックカット', url: 'https://fants.jp/feeds/595731?openExternalBrowser=1' },
        ]
      },
      {
        id: 'soto-hane-bob',
        name: '外ハネボブ',
        description: 'トレンド感のある切りっぱなし質感と、再現性の高い外ハネラインの構成。',
        date: '2024.02.01',
        points: [
           { id: 'p1', title: '長さ設定', description: '肩に当たって自然にハネる位置を見極め、計算して長さを設定する。' }
        ],
        lessons: [
          { id: 'l1', title: 'ベースカット', url: 'https://fants.jp/feeds/945893?openExternalBrowser=1' },
          { id: 'l2', title: '質感調整', url: 'https://fants.jp/feeds/945895?openExternalBrowser=1' },
        ]
      },
      {
        id: 'graduation-bob',
        name: 'グラデーションボブ',
        description: '丸みと重さのバランスで作る、女性らしいシルエットとウェイトコントロール。',
        date: '2023.12.15',
        points: [
           { id: 'p1', title: 'パネルの引き出し角度', description: '各パネルを45度に引き出し、グラデーションの幅を一定に保つ。' },
           { id: 'p2', title: 'コーナーチェック', description: 'パネルを展開図と逆方向に引き出し、不要な角を取り除く。' }
        ],
        lessons: [
          { id: 'l1', title: 'バックセクション', url: 'https://fants.jp/feeds/598454?openExternalBrowser=1' },
          { id: 'l2', title: 'サイドセクション', url: 'https://fants.jp/feeds/598480?openExternalBrowser=1' },
          { id: 'l3', title: 'ブロー', url: 'https://fants.jp/feeds/598484?openExternalBrowser=1' },
          { id: 'l4', title: 'チェックカット', url: 'https://fants.jp/feeds/598490?openExternalBrowser=1' },
        ]
      },
      {
        id: 'insta-short',
        name: 'インスタショート',
        description: 'SNS映えする束感とシルエットを意識したショート。',
        date: '2024.01.20',
        points: [
          { id: 'p1', title: '束感の形成', description: 'スタイリング剤をつけた時に動きが出やすいように、間引くセニングを入れる。' }
        ],
        lessons: [
          { id: 'l1', title: 'バックセクション', url: 'https://fants.jp/feeds/692153?openExternalBrowser=1' },
          { id: 'l2', title: 'サイドセクション・前髪', url: 'https://fants.jp/feeds/692156?openExternalBrowser=1' },
          { id: 'l3', title: 'オーバーセクション・襟足', url: 'https://fants.jp/feeds/692159?openExternalBrowser=1' },
          { id: 'l4', title: 'ブロー', url: 'https://fants.jp/feeds/692161?openExternalBrowser=1' },
          { id: 'l5', title: 'バックセクションセニング', url: 'https://fants.jp/feeds/692165?openExternalBrowser=1' },
          { id: 'l6', title: 'サイドセクションセニング', url: 'https://fants.jp/feeds/692170?openExternalBrowser=1' },
          { id: 'l7', title: '前髪セニング', url: 'https://fants.jp/feeds/692171?openExternalBrowser=1' },
          { id: 'l8', title: 'スタイリング', url: 'https://fants.jp/feeds/692174?openExternalBrowser=1' },
        ]
      },
      {
        id: 'soto-hane-medium',
        name: '外ハネミディアム',
        description: '鎖骨レングスで作る、抜け感のあるミディアムスタイル。',
        date: '2024.01.25',
        points: [
           { id: 'p1', title: '鎖骨レングス', description: '肩に当たって跳ねる長さを利用し、自然な外ハネを作る。' }
        ],
        lessons: [
          { id: 'l1', title: 'ベースカット', url: 'https://fants.jp/feeds/629362?openExternalBrowser=1' },
          { id: 'l2', title: 'バング・オーバーセクション', url: 'https://fants.jp/feeds/629428?openExternalBrowser=1' },
          { id: 'l3', title: '質感・量感調整', url: 'https://fants.jp/feeds/629444?openExternalBrowser=1' },
          { id: 'l4', title: '前髪・フィニッシュ', url: 'https://fants.jp/feeds/629451?openExternalBrowser=1' },
        ]
      },
      // --- その他のBASICスタイル ---
      {
        id: 'grabob-short',
        name: 'グラボブショート',
        description: '襟足をタイトに収め、後頭部の丸みを強調するショートスタイル。',
        externalUrl: '',
        date: '2023.11.01',
        points: []
      },
      {
        id: 'layer-no-bangs',
        name: 'バングなしレイヤー',
        description: '大人っぽさと動きを表現する、顔周りのリバース毛流れ。',
        externalUrl: '',
        date: '2023.11.05',
        points: []
      },
      {
        id: 'layer-with-bangs',
        name: 'バングありレイヤー',
        description: '小顔効果と可愛らしさを引き出す、前髪とレイヤーのつながり。',
        externalUrl: '',
        date: '2023.11.10',
        points: []
      },
      {
        id: 'layer-theory',
        name: 'レイヤー解体新書',
        description: '感覚ではなく理論で理解する、レイヤーの仕組みと構造。',
        externalUrl: '',
        date: '2023.11.15',
        points: []
      },
      {
        id: '135-layer',
        name: '１３５°レイヤー',
        description: 'ハイレイヤーで軽さと動きを最大限に出すテクニック。',
        externalUrl: '',
        date: '2023.11.20',
        points: []
      },
      {
        id: 'handsome-mash',
        name: 'ハンサムマッシュ',
        description: 'クールさとジェンダーレスな魅力を併せ持つマッシュスタイル。',
        externalUrl: '',
        date: '2023.11.25',
        points: []
      }
    ]
  },
  {
    id: 'advance',
    title: 'ADVANCE',
    subtitle: '応用とデザイン',
    description: 'トレンドを取り入れた質感調整、パーマやカラーとの連動性を考えた複合的デザイン。',
    styles: [
      {
        id: 'texture-master-short',
        name: '質感マスターショート',
        description: '骨格に合わせたベースカットと、スライドカットによる質感調整で再現性を高めるショートスタイル。',
        date: '2024.02.10',
        points: [
          { id: 'p1', title: '骨格診断', description: 'お客様の頭の形を把握し、どこにボリュームを残し、どこを削るかを設計する。' },
          { id: 'p2', title: 'スライドカット', description: '毛束の中間から毛先にかけて滑らせるようにハサミを入れ、柔らかな動きを作る。' }
        ],
        lessons: [
          { id: 'l1', title: '骨格診断', url: 'https://fants.jp/feeds/697074?openExternalBrowser=1' },
          { id: 'l2', title: 'バックセクション', url: 'https://fants.jp/feeds/697078?openExternalBrowser=1' },
          { id: 'l3', title: 'サイド・ベースセニング', url: 'https://fants.jp/feeds/697080?openExternalBrowser=1' },
          { id: 'l4', title: '前髪・顔まわり', url: 'https://fants.jp/feeds/697083?openExternalBrowser=1' },
          { id: 'l5', title: '襟足・量感調整', url: 'https://fants.jp/feeds/698369?openExternalBrowser=1' },
          { id: 'l6', title: 'スライドカット', url: 'https://fants.jp/feeds/698766?openExternalBrowser=1' },
          { id: 'l7', title: 'スタイリング', url: 'https://fants.jp/feeds/698767?openExternalBrowser=1' },
          { id: 'l8', title: '撮影', url: 'https://fants.jp/feeds/698772?openExternalBrowser=1' },
        ]
      },
      {
        id: 'kubire-layer',
        name: 'くびれレイヤー',
        description: 'トレンドのくびれシルエットを作るレイヤーテクニックと、顔まわりの似合わせを徹底解説。',
        date: '2023.12.20',
        points: [
          { id: 'p1', title: 'ウェイト位置', description: 'くびれを作るために、トップのボリュームとアンダーの軽さのバランスを調整する。' },
          { id: 'p2', title: '顔まわりのリバース', description: 'アイロンワークを想定した、流れやすいレイヤーを入れる。' }
        ],
        lessons: [
          { id: 'l1', title: 'ベースカット', url: 'https://fants.jp/feeds/599291?openExternalBrowser=1' },
          { id: 'l2', title: '前髪・顔まわり①', url: 'https://fants.jp/feeds/599295?openExternalBrowser=1' },
          { id: 'l3', title: '前髪・顔まわり②', url: 'https://fants.jp/feeds/604348?openExternalBrowser=1' },
          { id: 'l4', title: '質感調整', url: 'https://fants.jp/feeds/604353?openExternalBrowser=1' },
          { id: 'l5', title: 'スタイリング', url: 'https://fants.jp/feeds/606374?openExternalBrowser=1' },
          { id: 'l6', title: '撮影', url: 'https://fants.jp/feeds/606375?openExternalBrowser=1' },
        ]
      },
      {
        id: 'advance-long',
        name: 'アドバンスロング',
        description: 'ロングヘアにおけるデザインの考え方と展開図の理解を深める理論講座。',
        date: '2023.12.25',
        points: [
          { id: 'p1', title: '展開図の理解', description: 'ロングヘアの重さと動きをコントロールするための構造的理解。' }
        ],
        lessons: [
          { id: 'l1', title: '基本的な考え方', url: 'https://fants.jp/feeds/618435?openExternalBrowser=1' },
          { id: 'l2', title: '考え方②', url: 'https://fants.jp/feeds/624559?openExternalBrowser=1' },
          { id: 'l3', title: '考え方③', url: 'https://fants.jp/feeds/624560?openExternalBrowser=1' },
          { id: 'l4', title: '考え方④', url: 'https://fants.jp/feeds/624564?openExternalBrowser=1' },
          { id: 'l5', title: '考え方⑤', url: 'https://fants.jp/feeds/624568?openExternalBrowser=1' },
        ]
      },
      {
        id: 'bangs-master',
        name: '前髪カット徹底攻略',
        description: '印象を大きく左右する前髪のデザインロジック。リフトや奥行きによる変化を学ぶ。',
        date: '2024.01.05',
        points: [
          { id: 'p1', title: 'リフトコントロール', description: 'パネルを引き上げる角度によって、前髪の軽さと流れを調整する。' },
          { id: 'p2', title: '奥行き設定', description: '前髪の厚みを決める奥行きの取り方と、それに伴う印象操作。' }
        ],
        lessons: [
          { id: 'l1', title: 'リフト操作による印象の違い', url: 'https://fants.jp/feeds/631381?openExternalBrowser=1' },
          { id: 'l2', title: '奥行きによる印象の違い', url: 'https://fants.jp/feeds/631387?openExternalBrowser=1' },
          { id: 'l3', title: '質感・量感の調整', url: 'https://fants.jp/feeds/631390?openExternalBrowser=1' },
          { id: 'l4', title: 'デザインの読み解き方', url: 'https://fants.jp/feeds/631391?openExternalBrowser=1' },
        ]
      },
      {
        id: 'short-straightening',
        name: 'ショート×縮毛デザイン',
        description: '縮毛矯正毛に対するショートカットのアプローチ。仮切りと本切りのプロセス。',
        date: '2024.03.10',
        points: [
          { id: 'p1', title: '仮切り', description: '縮毛矯正前に大まかな長さを切り、薬液塗布の効率を上げる。' },
          { id: 'p2', title: '本切り', description: '矯正後の髪の落ち位置を確認しながら、精密なラインを作る。' }
        ],
        lessons: [
          { id: 'l1', title: '仮切り', url: 'https://fants.jp/feeds/1004258?openExternalBrowser=1' },
          { id: 'l2', title: '本切り', url: 'https://fants.jp/feeds/1004275?openExternalBrowser=1' },
        ]
      },
      {
        id: 'lift-layer',
        name: 'リフトレイヤー',
        description: 'リフトアップ効果と軽さを出すレイヤースタイル。',
        date: '2024.03.15',
        points: [
           { id: 'p1', title: 'トップの動き', description: 'トップにレイヤーを入れ、ふんわりとした高さを出す。' }
        ],
        lessons: [
          { id: 'l1', title: 'デザインの読み解き・バックセクション', url: 'https://fants.jp/feeds/1023588?openExternalBrowser=1' },
          { id: 'l2', title: '顔まわり・バング', url: 'https://fants.jp/feeds/1023612?openExternalBrowser=1' },
        ]
      },
      {
        id: 'slide-cut-basic',
        name: 'スライドカットの基本',
        description: '質感調整の要となるスライドカットの基礎技術。レングス別の実践テクニック。',
        date: '2024.03.20',
        points: [
          { id: 'p1', title: 'シザーの滑らせ方', description: '髪の表面を傷つけないよう、刃の入れ方とスピードをコントロールする。' }
        ],
        lessons: [
          { id: 'l1', title: 'ロングスライド', url: 'https://fants.jp/feeds/969785?openExternalBrowser=1' },
          { id: 'l2', title: 'ミディアムスライド', url: 'https://fants.jp/feeds/969796?openExternalBrowser=1' },
          { id: 'l3', title: 'ショートスライド', url: 'https://fants.jp/feeds' },
        ]
      }
    ]
  },
  {
    id: 'charisma',
    title: '【セミナー動画】',
    subtitle: 'トップスタイリストの思考',
    description: '業界を牽引する特別講師による、撮影技術やブランディングを含めた総合セミナー。',
    styles: [
      {
        id: 'dry-short-mugishima',
        name: '【予約で埋まり続けるドライショート｜yaeca代表 麦島幸次 氏】',
        description: '予約が絶えない人気スタイリスト麦島氏による、再現性の高いドライショートの極意。カウンセリングから撮影まで、サロンワークの全工程を公開。',
        date: '2024.03.30',
        points: [
           { id: 'p1', title: 'ドライカットの精度', description: '乾いた状態で切ることで、クセや生え方をダイレクトに補正し、自宅での再現性を高める。' }
        ],
        lessons: [
          { id: 'l1', title: 'カウンセリング', url: 'https://fants.jp/feeds/654181?openExternalBrowser=1' },
          { id: 'l2', title: 'ベースカット', url: 'https://fants.jp/feeds/655380?openExternalBrowser=1' },
          { id: 'l3', title: 'ベースカット２', url: 'https://fants.jp/feeds/654632?openExternalBrowser=1' },
          { id: 'l4', title: 'セニング・質感調整', url: 'https://fants.jp/feeds/654640?openExternalBrowser=1' },
          { id: 'l5', title: '顔まわり', url: 'https://fants.jp/feeds/654655?openExternalBrowser=1' },
          { id: 'l6', title: 'ウェット・ドライ', url: 'https://fants.jp/feeds/654663?openExternalBrowser=1' },
          { id: 'l7', title: 'ディティールワーク', url: 'https://fants.jp/feeds/654667?openExternalBrowser=1' },
          { id: 'l8', title: 'フィニッシュワーク・スタイリング', url: 'https://fants.jp/feeds/654673?openExternalBrowser=1' },
          { id: 'l9', title: '撮影', url: 'https://fants.jp/feeds/654678?openExternalBrowser=1' },
        ]
      },
      {
        id: 'royal-road-layer-matsuura',
        name: '【王道レイヤー｜kumu代表 松浦ふうま 氏】',
        description: '誰からも愛される王道レイヤーの決定版。ベースカットの正確性から、質感を高めるスタイリング、撮影テクニックまでを網羅。',
        date: '2024.03.29',
        points: [
           { id: 'p1', title: '顔まわりの似合わせ', description: '骨格を補正し、小顔効果を最大限に引き出す顔まわりのレイヤー設計。' }
        ],
        lessons: [
          { id: 'l1', title: 'ベースカット', url: 'https://fants.jp/feeds/610164?openExternalBrowser=1' },
          { id: 'l2', title: '右サイドの注意点', url: 'https://fants.jp/feeds/611688?openExternalBrowser=1' },
          { id: 'l3', title: '質感調整', url: 'https://fants.jp/feeds/613828?openExternalBrowser=1' },
          { id: 'l4', title: '前髪・顔まわり', url: 'https://fants.jp/feeds/613830?openExternalBrowser=1' },
          { id: 'l5', title: 'スタイリング・撮影', url: 'https://fants.jp/feeds/615166?openExternalBrowser=1' },
          { id: 'l6', title: 'スタイリング２・撮影', url: 'https://fants.jp/feeds/615194?openExternalBrowser=1' },
        ]
      },
      {
        id: 'hair-quality-improvement-adachi',
        name: '【２時間で終わる髪質改善｜美髪大学 安達 瞭氏】',
        description: '短時間で高単価を実現する髪質改善の理論と工程。効率的な薬剤選定とワークフロー。',
        date: '2024.03.28',
        points: [
           { id: 'p1', title: 'タイムパフォーマンス', description: '通常3時間以上かかる工程を2時間で終わらせるための効率化と薬剤選定。' }
        ],
        lessons: [
          { id: 'l1', title: '毛髪診断', url: 'https://fants.jp/feeds/690600?openExternalBrowser=1' },
          { id: 'l2', title: '一液塗布', url: 'https://fants.jp/feeds/690604?openExternalBrowser=1' },
          { id: 'l3', title: '中間水洗', url: 'https://fants.jp/feeds/690607?openExternalBrowser=1' },
          { id: 'l4', title: 'ドライ', url: 'https://fants.jp/feeds/690610?openExternalBrowser=1' },
          { id: 'l5', title: 'アイロンワーク', url: 'https://fants.jp/feeds/690615?openExternalBrowser=1' },
          { id: 'l6', title: '２液塗布', url: 'https://fants.jp/feeds/690617?openExternalBrowser=1' },
          { id: 'l7', title: 'ドライ・仕上がり', url: 'https://fants.jp/feeds/690619?openExternalBrowser=1' },
        ]
      },
      {
        id: 'belo-texture-makeup',
        name: '【BELO｜島原GO氏】一撃質感メイク',
        description: '短時間で劇的に変わる質感調整のテクニック。サロンワークで即戦力となる島原流の魔法。',
        date: '2024.03.27',
        points: [
           { id: 'p1', title: '一撃のインパクト', description: '最小の手数で最大の効果を生む、効率的かつ劇的な質感調整。' }
        ],
        lessons: [
          { id: 'l1', title: 'ベースカット', url: 'https://fants.jp/feeds/704924?openExternalBrowser=1' },
          { id: 'l2', title: '質感調整', url: 'https://fants.jp/feeds/704935?openExternalBrowser=1' },
          { id: 'l3', title: 'フィニッシュ', url: 'https://fants.jp/feeds/704954?openExternalBrowser=1' },
        ]
      },
      {
        id: 'perm-wolf-layer',
        name: '【シザーズリーグ四天王｜近藤 連太郎氏】苦手克服パーマ！ウルフレイヤー',
        description: 'パーマスタイルに苦手意識がある方必見。ウルフレイヤーとパーマの連動性を学ぶ実践的セミナー。',
        date: '2024.03.26',
        points: [
           { id: 'p1', title: 'パーマとカットの連動', description: 'カールの動きを計算に入れたベースカットと質感調整。' }
        ],
        lessons: [
          { id: 'l1', title: 'ベースカット', url: 'https://fants.jp/feeds/713413?openExternalBrowser=1' },
          { id: 'l2', title: '質感調整・レイヤー', url: 'https://fants.jp/feeds/715733?openExternalBrowser=1' },
          { id: 'l3', title: 'ワインディング', url: 'https://fants.jp/feeds/716584?openExternalBrowser=1' },
          { id: 'l4', title: 'チェック', url: 'https://fants.jp/feeds/718708?openExternalBrowser=1' },
          { id: 'l5', title: 'フィニッシュ', url: 'https://fants.jp/feeds/718709?openExternalBrowser=1' },
        ]
      },
      {
        id: 'special-gray-hair',
        name: '【NOOS代表　岩屋 真氏】スペシャル白髪ぼかしセミナー',
        description: '白髪を隠すのではなく活かす、次世代のグレイカラー提案。',
        date: '2024.03.22',
        points: [
           { id: 'p1', title: 'ハイライトの設計', description: '白髪の生え方に合わせた効果的なハイライトの配置。' }
        ],
        lessons: [
          { id: 'l1', title: '白髪ぼかしセミナー', url: 'https://fants.jp/feeds/991326?openExternalBrowser=1' }
        ]
      },
      {
        id: 'cut-battle-2024',
        name: '【アルテマ｜志賀代表】【BELO｜島原GO氏】カットバトルセミナー',
        description: '業界トップランナーたちによるリアルカットバトル。技術と感性の真剣勝負。',
        date: '2024.02.25',
        points: [
          { id: 'p1', title: 'スピードと精度', description: '限られた時間内で最高のクオリティを出すための仕事運び。' }
        ],
        lessons: [
          { id: 'l1', title: 'アルテマ代表　志賀氏', url: 'https://fants.jp/feeds/924936?openExternalBrowser=1' },
          { id: 'l2', title: 'BELO代表　島原GO氏', url: 'https://fants.jp/feeds/926994?openExternalBrowser=1' },
          { id: 'l3', title: '美容師サプリ代表　関口裕樹', url: 'https://fants.jp/feeds/924939?openExternalBrowser=1' }
        ]
      },
      {
        id: 'butterfly-layer',
        name: '【JEWIL｜佐藤優真氏】バタフライレイヤー',
        description: '顔まわりの華やかな動きとくびれ感が特徴の韓国風レイヤースタイル。',
        date: '2024.02.20',
        points: [
          { id: 'p1', title: '顔まわりの構成', description: '独立したレイヤーで作る、リバースの流れとボリューム感。' }
        ],
        lessons: [
          { id: 'l1', title: 'ベースカット', url: 'https://fants.jp/feeds/872396?openExternalBrowser=1' },
          { id: 'l2', title: 'ブロー', url: 'https://fants.jp/feeds/872402?openExternalBrowser=1' },
          { id: 'l3', title: 'レイヤーセクション', url: 'https://fants.jp/feeds/872408?openExternalBrowser=1' },
          { id: 'l4', title: '質感調整・フィニッシュワーク', url: 'https://fants.jp/feeds/873971?openExternalBrowser=1' }
        ]
      },
       {
        id: 'adhesion-bob',
        name: '【カット教育の第一人者｜枝村仁氏】密着BOBベーシック',
        description: '究極のフィット感を生み出すボブカットの理論と実践。',
        date: '2024.02.15',
        points: [
          { id: 'p1', title: 'インナーグラデーション', description: '内側の髪を短くし、自然と内に入るラインを作る。' }
        ],
        lessons: [
          { id: 'l1', title: 'バックセクション', url: 'https://fants.jp/feeds/781542?openExternalBrowser=1' },
          { id: 'l2', title: 'サイド・オーバーセクション', url: 'https://fants.jp/feeds/781545?openExternalBrowser=1' },
          { id: 'l3', title: '流れるセニング', url: 'https://fants.jp/feeds/781547?openExternalBrowser=1' },
          { id: 'l4', title: '収まるセニング', url: 'https://fants.jp/feeds/781553?openExternalBrowser=1' },
          { id: 'l5', title: 'スタイリング', url: 'https://fants.jp/feeds/781556?openExternalBrowser=1' },
          { id: 'l6', title: 'フィニッシュワーク', url: 'https://fants.jp/feeds/781559?openExternalBrowser=1' }
        ]
      }
    ]
  },
  {
    id: 'izakaya',
    title: '居酒屋セキグチ',
    subtitle: 'コミュニティ & マインド',
    description: '技術以外の悩み相談、経営論、そして美容師としての生き方を語り合う場。',
    styles: [
      {
        id: 'mindset-1',
        name: '指名100万への道',
        description: '技術だけでない、人間力の磨き方。',
        externalUrl: 'https://example.com/blog/mindset',
        date: '2024.01.01',
        points: [
          { id: 'p1', title: '挨拶の重要性', description: '全てのコミュニケーションは最初の3秒で決まる。' }
        ]
      }
    ]
  }
];