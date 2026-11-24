export interface WorkTimelineEntry {
  id: string;
  year: string;
  title: string;
  role: string;
  thumbnail: string;
}

const thumbnails = [
  'https://images.pexels.com/photos/7206205/pexels-photo-7206205.jpeg?auto=compress&cs=tinysrgb&h=260&w=180',
  'https://images.pexels.com/photos/12179119/pexels-photo-12179119.jpeg?auto=compress&cs=tinysrgb&h=260&w=180',
  'https://images.pexels.com/photos/34658408/pexels-photo-34658408.jpeg?auto=compress&cs=tinysrgb&h=260&w=180',
];

export const worksTimeline: WorkTimelineEntry[] = [
  { id: '2026-01', year: '2026', title: '《粉红王爷》', role: '顾清云', thumbnail: thumbnails[0] },
  { id: '2026-02', year: '2026', title: '《半夏的青春》', role: '彭守义', thumbnail: thumbnails[1] },
  { id: '2026-03', year: '2026', title: '《执手同谋不负卿》', role: '裴晏', thumbnail: thumbnails[2] },
  { id: '2026-04', year: '2026', title: '《夫人她专治不服4》', role: '霍南风', thumbnail: thumbnails[0] },
  { id: '2026-05', year: '2026', title: '《冤家路不窄》', role: '祈宥', thumbnail: thumbnails[1] },
  { id: '2026-06', year: '2026', title: '《咬夏阳》', role: '景行', thumbnail: thumbnails[2] },
  { id: '2026-07', year: '2026', title: '《满分恋人》', role: '程凛', thumbnail: thumbnails[0] },
  { id: '2026-08', year: '2026', title: '《我妻柔弱不能自理》', role: '周晋安', thumbnail: thumbnails[1] },
  { id: '2026-09', year: '2026', title: '《抱新郎》', role: '宋抱玉 / 宋衍之', thumbnail: thumbnails[2] },
  { id: '2026-10', year: '2026', title: '《下雨天》', role: '江淮', thumbnail: thumbnails[0] },
  { id: '2026-11', year: '2026', title: '《小狗嗅蔷薇》', role: '陈肆', thumbnail: thumbnails[1] },
  { id: '2026-12', year: '2026', title: '《偏偏染指》', role: '谢延津', thumbnail: thumbnails[2] },
  { id: '2026-13', year: '2026', title: '《夫人手下留情》', role: '景翊', thumbnail: thumbnails[0] },
  { id: '2026-14', year: '2026', title: '《刺杀夫君？得加钱》', role: '沈司诀', thumbnail: thumbnails[1] },
  { id: '2025-01', year: '2025', title: '《爱意成空》', role: '李明西', thumbnail: thumbnails[2] },
  { id: '2025-02', year: '2025', title: '《宁弈》', role: '萧怀沣', thumbnail: thumbnails[0] },
  { id: '2025-03', year: '2025', title: '《朝朝来池》', role: '陈池', thumbnail: thumbnails[1] },
  { id: '2025-04', year: '2025', title: '《喵妃在上》', role: '秦戾', thumbnail: thumbnails[2] },
  { id: '2025-05', year: '2025', title: '《专业和亲，副业谐星》', role: '谢君安', thumbnail: thumbnails[0] },
  { id: '2025-06', year: '2025', title: '《丞相姐姐你又红温了》', role: '宋濯', thumbnail: thumbnails[1] },
  { id: '2025-07', year: '2025', title: '《她的小新欢》', role: '霍悬野', thumbnail: thumbnails[2] },
  { id: '2025-08', year: '2025', title: '《胡说，她才不是坏女人》', role: '鹤知羽', thumbnail: thumbnails[0] },
  { id: '2025-09', year: '2025', title: '《十八岁太奶奶驾到，重整家族荣耀》', role: '纪舟野', thumbnail: thumbnails[1] },
  { id: '2025-10', year: '2025', title: '《十八岁太奶奶驾到，重整家族荣耀2》', role: '纪舟野', thumbnail: thumbnails[2] },
  { id: '2025-11', year: '2025', title: '《春棠晚》', role: '君承衍', thumbnail: thumbnails[0] },
  { id: '2025-12', year: '2025', title: '《夫人她专治不服》', role: '席星野', thumbnail: thumbnails[1] },
  { id: '2025-13', year: '2025', title: '《梦入朝歌行》', role: '姬发', thumbnail: thumbnails[2] },
  { id: '2025-14', year: '2025', title: '《春夜玷明月》', role: '晏墨白', thumbnail: thumbnails[0] },
  { id: '2025-15', year: '2025', title: '《我家夫君妻管严》', role: '池宴', thumbnail: thumbnails[1] },
  { id: '2025-16', year: '2025', title: '《金枝缠梦/世子夫人有喜了》', role: '裴如衍', thumbnail: thumbnails[2] },
  { id: '2025-17', year: '2025', title: '《夫人她专治不服2》', role: '席星野', thumbnail: thumbnails[0] },
  { id: '2025-18', year: '2025', title: '《十八岁太奶奶驾到，重整家族荣耀3》', role: '纪舟野', thumbnail: thumbnails[1] },
  { id: '2025-19', year: '2025', title: '《夫人她专治不服3之将门捉婿》', role: '晏书澜', thumbnail: thumbnails[2] },
  { id: '2025-20', year: '2025', title: '《萌娃太后三岁半》', role: '墨羽', thumbnail: thumbnails[0] },
  { id: '2025-21', year: '2025', title: '《八零姐妹的交换人生》', role: '魏池', thumbnail: thumbnails[1] },
  { id: '2025-22', year: '2025', title: '《没关系，是家人啊》', role: '陈一仁', thumbnail: thumbnails[2] },
  { id: '2025-23', year: '2025', title: '《他的小温暖》', role: '陆硕', thumbnail: thumbnails[0] },
  { id: '2024-01', year: '2024', title: '《传下去，顾总他不行/传下去，顾总走了》', role: '顾铭轩', thumbnail: thumbnails[1] },
  { id: '2024-02', year: '2024', title: '《错娶》', role: '顾廷彦', thumbnail: thumbnails[2] },
  { id: '2024-03', year: '2024', title: '《追上校花的那一天》', role: '顾铭', thumbnail: thumbnails[0] },
  { id: '2024-04', year: '2024', title: '《替嫁医妃嘎嘎乱杀/医心绘梦》', role: '骆君鹤', thumbnail: thumbnails[1] },
  { id: '2024-05', year: '2024', title: '《重生1996，我在娱乐圈当影后》', role: '傅凌度', thumbnail: thumbnails[2] },
];
