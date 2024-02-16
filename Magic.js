/**
 * @description  2024-刘谦魔术-约瑟夫原理
 * @step1 随机选择4张卡片，ABCD
 * @step2 把这4张牌对折，撕成两半，叠放在一起。ABCD ABCD
 * @step3 把牌背面朝上。你的名字是几个字，就从顶上拿几张到最底下。CDABCDAB
 * @step4 从牌堆最顶上拿3张牌，随意地插入中间。BCDACDAB
 * @step5 把最顶上的牌藏在屁股底下。CDACDAB （B）
 * @step6 如果你是南方人，就从牌顶拿1张牌放到中间。如果你是北方人，放2张。如果你不知道是南方人还是北方人，就插3张。DCACDAB
 * @step7 如果你是男生，从最上面拿1张洒到空中。如果你是女生，从最上面拿2张洒到空中。CACDAB
 * @step8 口中念“见证奇迹的时刻”7个字，每念一次，把一张牌从上面拿到底层。ACDABC
 * @step9 口中喊“好运留下来！”并把顶上的牌放到底层。再喊“烦恼丢出去！”把顶上的牌扔到空中。女生循环4次，男生循环5次。B
 */

const startMagic = (myName, gender, from) => {
  const cards = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  const currentCards = [];

  for (let i = 0; i <= 3; i++) {
    const index = Math.floor(Math.random() * cards.length);
    currentCards.push(...cards.splice(index - 1, 1));
  }
  console.log('step1-随机选择4张卡片：', currentCards);

  currentCards.map((card) => currentCards.push(card));
  console.log('step2-把这4张牌对折，撕成两半，叠放在一起：', currentCards);

  for (let i = 0; i < myName.length; i++) {
    currentCards.push(currentCards.shift());
  }
  console.log(
    'step3-把牌背面朝上。你的名字是几个字，就从顶上拿几张到最底下：',
    currentCards
  );

  const randomSetCards = currentCards.splice(0, 3);
  const randomSetIndex =
    1 + Math.floor(Math.random() * (currentCards.length - 1));
  currentCards.splice(randomSetIndex, 0, ...randomSetCards);
  console.log('step4-从牌堆最顶上拿3张牌，随意地插入中间：', currentCards);

  const result = currentCards.shift();
  console.log('step5-把最顶上的牌藏在屁股底下：', currentCards);
  console.log('屁股底下的牌为：', result);

  let randomFromCards = [];
  if (from === '南方') {
    randomFromCards = currentCards.splice(0, 1);
  } else if (from === '北方') {
    randomFromCards = currentCards.splice(0, 2);
  } else {
    randomFromCards = currentCards.splice(0, 3);
  }
  const randomFromIndex =
    1 + Math.floor(Math.random() * (currentCards.length - 1));
  currentCards.splice(randomFromIndex, 0, ...randomFromCards);
  console.log(
    'step6-如果你是南方人，就从牌顶拿1张牌放到中间。如果你是北方人，放2张。如果你不知道是南方人还是北方人，就插3张：',
    currentCards
  );

  if (gender === '男') {
    currentCards.splice(0, 1);
  } else if (gender === '女') {
    currentCards.splice(0, 2);
  } else {
    currentCards.splice(0, 3);
  }
  console.log(
    'step7-如果你是男生，从最上面拿1张洒到空中。如果你是女生，从最上面拿2张洒到空中：',
    currentCards
  );

  for (let i = 0; i < '见证奇迹的时刻'.length; i++) {
    currentCards.push(currentCards.shift());
  }
  console.log(
    'step8-口中念“见证奇迹的时刻”7个字，每念一次，把一张牌从上面拿到底层：',
    currentCards
  );

  while (currentCards.length > 1) {
    currentCards.push(currentCards.shift());
    console.log('好运留下来');
    const throwCard = currentCards.shift();
    console.log('坏运扔出去', throwCard);
    console.log('当前手牌为', currentCards);
  }

  console.log('step9-最后你的手牌为：', currentCards);
  if (currentCards.length === 1 && currentCards[0] === result) {
    console.log('恭喜你！配对成功，藏起来的卡牌为：', currentCards);
    return true;
  } else {
    console.log('失败了请重试，藏起来的卡牌为：', result);
    return false;
  }
};

startMagic('尼格买提热合曼', '男', '北方');

const testMagic = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let successCount = 0,
    failCount = 0;
  // 表演魔术1000次
  for (let i = 0; i < 1000; i++) {
    const name = Array.from({
      length: Math.floor(Math.random() * characters.length),
    }).reduce(
      (result) =>
        result +
        characters.charAt(Math.floor(Math.random() * characters.length)),
      ''
    );
    const gender = Math.floor(Math.random() * 2) ? '男' : '女';
    let from = '北方';
    const fromRandom = Math.floor(Math.random() * 3) ? '男' : '女';
    if (fromRandom === 0) {
      from = '南方';
    } else if (fromRandom === 1) {
      from = '我也不确定';
    }
    if (startMagic(name, gender, from)) {
      successCount++;
    } else {
      failCount++;
    }
    console.log('========本次表演详细信息： \n', name, gender, from);
  }
  console.log(`共表演1000次，成功${successCount}次，失败${failCount}次`);
};

testMagic();
