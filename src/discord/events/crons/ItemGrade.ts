import { TextChannel } from 'discord.js';
import { items } from '../../../neople/constants/item';
import { ItemGradeName, ItemType, ItemTypeDetail } from '../../../neople/interfaces/item';
import { NeopleService } from '../../../neople/neople.service';
import { ShumeEmbedBuilder } from '../../utils/embed';
import { getKST } from '../../utils/time';

type ConvertedItem = {
  itemType: Exclude<ItemType, '추가장비'> | '특수장비';
  itemTypeDetail: ItemTypeDetail;
  itemGradeName: ItemGradeName;
  itemGradeValue: number;
  strNow: number;
  strMax: number;
  intNow: number;
  intMax: number;
  hpNow: number;
  hpMax: number;
  spiNow: number;
  spiMax: number;
  armorNow: number;
  armorMax: number;
  magicRegistNow: number;
  magicRegistMax: number;
};

/**
 * 금일 장비의 스탯과 해당 장비가 가질 수 있는 극옵 간의 차이를 문자열로 반환하는 함수
 * - 금일 장비의 스탯이 극옵이 아닌 경우에는 `최솟값 - 최댓값` 반환
 * - 금일 장비의 스탯이 극옵인 경우에는 `✨` 이모지 반환
 */
const getDistText = (now: number, max: number) => {
  return now === max ? '✨' : `${now - max}`;
};

export const itemGrade = async (channel: TextChannel, neopleSerivce: NeopleService) => {
  try {
    // 장비 상세 정보와 상점 판매 정보를 토대로 가공
    // -1 처리를 하는 이유는 보유하고 있지 않은 스탯을 구분하기 위함
    const convertedItems: ConvertedItem[] = await Promise.all(
      items.map(async (item) => {
        const detail = await neopleSerivce.getItemDetailInfo(item.itemId);
        const sales = await neopleSerivce.getItemSalesInfo(item.itemId);

        return {
          itemType: item.itemType === '추가장비' ? '특수장비' : item.itemType,
          itemTypeDetail: item.itemTypeDetail,
          itemGradeName: sales.itemGradeName,
          itemGradeValue: sales.itemGradeValue,
          strNow: sales.itemStatus.find((s) => s.name === '힘')?.value ?? -1,
          strMax: detail.itemStatus.find((s) => s.name === '힘')?.value ?? -1,
          intNow: sales.itemStatus.find((s) => s.name === '지능')?.value ?? -1,
          intMax: detail.itemStatus.find((s) => s.name === '지능')?.value ?? -1,
          hpNow: sales.itemStatus.find((s) => s.name === '체력')?.value ?? -1,
          hpMax: detail.itemStatus.find((s) => s.name === '체력')?.value ?? -1,
          spiNow: sales.itemStatus.find((s) => s.name === '정신력')?.value ?? -1,
          spiMax: detail.itemStatus.find((s) => s.name === '정신력')?.value ?? -1,
          armorNow: sales.itemStatus.find((s) => s.name === '물리 방어력')?.value ?? -1,
          armorMax: detail.itemStatus.find((s) => s.name === '물리 방어력')?.value ?? -1,
          magicRegistNow: sales.itemStatus.find((s) => s.name === '마법 방어력')?.value ?? -1,
          magicRegistMax: detail.itemStatus.find((s) => s.name === '마법 방어력')?.value ?? -1,
        };
      }),
    );

    const { year, month, day } = getKST();
    const embed = new ShumeEmbedBuilder()
      .setTitle(`${year}.${month}.${day} 오늘의 등급 - ${convertedItems[0].itemGradeName}`)
      .setDescription(
        `오늘의 장비 등급은 ${convertedItems[0].itemGradeName}이오이다! 무기의 경우는 일반적으로 마칼작 후 사용하므로 제외했소이다. 그리고 괄호 안에 숫자 대신 \`✨\` 이모지가 있는 경우는 극옵을 의미하니, 필요하다면 이 날 바꾸는 것을 추천하오이다.`,
      )
      .addFields({ name: '\n', value: '\n' });

    for (let i = 0; i < convertedItems.length; i++) {
      const nowItem = convertedItems[i];
      let value = '```';

      if (nowItem.armorNow !== -1)
        value += `- 물방: ${nowItem.armorNow}/${nowItem.armorMax} [${getDistText(nowItem.armorNow, nowItem.armorMax)}]\n`;
      if (nowItem.magicRegistNow !== -1)
        value += `- 마방: ${nowItem.magicRegistNow}/${nowItem.magicRegistMax} [${getDistText(nowItem.magicRegistNow, nowItem.magicRegistMax)}]\n`;
      value += `- 힘: ${nowItem.strNow}/${nowItem.strMax} [${getDistText(nowItem.strNow, nowItem.strMax)}]\n`;
      value += `- 지: ${nowItem.intNow}/${nowItem.intMax} [${getDistText(nowItem.intNow, nowItem.intMax)}]\n`;
      value += `- 체: ${nowItem.hpNow}/${nowItem.hpMax} [${getDistText(nowItem.hpNow, nowItem.hpMax)}]\n`;
      value += `- 정: ${nowItem.spiNow}/${nowItem.spiMax} [${getDistText(nowItem.spiNow, nowItem.spiMax)}]`;

      value += '```';

      embed.addFields({
        name: `${nowItem.itemTypeDetail} (${nowItem.itemGradeValue}%)\n`,
        value,
        inline: true,
      });

      // 한 줄에 2개씩 표시하기 위함(가독성)
      if (i % 2 || i === convertedItems.length - 1) {
        embed.addFields({
          name: '\n',
          value: '\n',
          inline: i === convertedItems.length - 1,
        });
      }
    }

    await channel.send({ embeds: [embed] });
  } catch (e) {
    await channel.send('던전앤파이터 API가 응답하지 않소이다. 나중에 다시 시도하시오.');
  }
};
