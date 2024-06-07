export type ItemType = '방어구' | '악세사리' | '추가장비';

export type ItemTypeDetail = '상의' | '하의' | '어깨' | '벨트' | '신발' | '팔찌' | '목걸이' | '반지' | '보조장비' | '마법석' | '귀걸이';

export type Item = {
  itemId: string;
  itemName: string;
  itemRarity: string;
  itemTypeId: string;
  itemType: ItemType;
  itemTypeDetailId: string;
  itemTypeDetail: ItemTypeDetail;
  itemAvailableLevel: number;
};

export type ItemStatusName = '힘' | '지능' | '체력' | '정신력' | '물리 방어력' | '마법 방어력';

type ItemStatus = {
  name: ItemStatusName;
  value: number;
};

export type ItemDetail = Item & {
  itemStatus: ItemStatus[];
};

type ItemGradeName = '최하급' | '하급' | '중급' | '상급' | '최상급';

export type ItemSalesDetail = Pick<ItemDetail, 'itemId' | 'itemName' | 'itemStatus'> & {
  itemGradeName: ItemGradeName;
  itemGradeValue: number;
};
