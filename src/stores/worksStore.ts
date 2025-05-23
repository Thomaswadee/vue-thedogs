import { defineStore } from 'pinia';

interface Work {
  id: number;
  cover: string;
  title: string;
  members: string[];
  link: string;
  tracks: string[];
}

export const useWorksStore = defineStore('works', {
  state: () => ({
    works: [
      {
        id: 1,
        cover: './src/assets/picture/2022.5.31.avif',
        title: '巡演最终场 The Dogs:归来 2022年5月31日复出演出',
        members: ['wade', 'police dog', '赵漠然', '修恒睿','doge','HpJe','yjx','kyc','lzy','cwb'],
        link: 'https://www.bilibili.com/video/BV1yU4y1D7yL/?spm_id_from=333.1387.homepage.video_card.click',
        tracks: ['具体曲目请点击跳转视频链接'],
      },
      {
        id: 2,
        cover: './src/assets/picture/2022.1.25.avif',
        title: ' The Dogs live aid II 2022.1.25 Nen Jiang 全国巡演第二站 高中站',
        members: ['wade', '修恒睿', 'police dog','doge','yjx','HpJe','kyc','lzy'],
        link: 'https://www.bilibili.com/video/BV1VS4y1L749/?spm_id_from=333.1387.homepage.video_card.click',
        tracks: ['00:17 红色高跟鞋', '02:07 水星记','03:27 Hey Jude','06:31 彩蛋'],
      },
      {
        id: 3,
        cover: './src/assets/picture/2022.3.30.avif',
        title: '双重幻想巡演第二场 DOUBLE FANTASY TOUR 2022.3.30  ',
        members: ['wade', 'police dog'],
        link: 'https://www.bilibili.com/video/BV1eL4y1L7qS/?spm_id_from=333.1387.homepage.video_card.click',
        tracks: ['0:00 富士山下'],
      },
      {
        id: 4,
        cover: './src/assets/picture/2022.3.11.avif',
        title: '双重幻想巡演第一场 DOUBLE FANTASY TOUR 2022.3.30 ',
        members: ['wade', 'police dog'],
        link: 'https://www.bilibili.com/video/BV11T4y1U7WR/?spm_id_from=333.1387.homepage.video_card.click',
        tracks: ['0:00 富士山下'], 
      },
      {
        id: 5,
        cover: './src/assets/picture/2022.12.31.avif',
        title: 'THE DOGS跨越2023演出 2022.12.31—2023.1.1',
        members: ['police dog','doge', '赵漠然', '修恒睿','doge','HpJe','yjx','kyc','lzy'],
        link: 'https://www.bilibili.com/video/BV1DY4y1d7ya/?spm_id_from=333.1387.homepage.video_card.click',
        tracks: ['具体曲目请点击跳转视频链接'],
      },
      {
        id: 6,
        cover: './src/assets/picture/2022.2.14.avif',
        title: '万夫莫敌巡演 第一场 Invincible Tour in NenJiang 2022.2.14 ',
        members: ['wade', 'police dog','doge'],
        link: 'https://www.bilibili.com/video/BV18P4y1w7hk/?spm_id_from=333.1387.homepage.video_card.click',
        tracks: ['00:00 孤勇者', '01:30 超级敏感','03:13 Yesterday'],
      },

      {
        id: 7,
        cover: './src/assets/picture/2022.1.14.avif',
        title: ' The Dogs live aid II 2022.1.14 Nen Jiang 全国巡演第一站 B场',
        members: ['wade', 'police dog','yjx','kyc','ly'],
        link: 'https://www.bilibili.com/video/BV1TP4y177hL/?spm_id_from=333.1387.homepage.video_card.click',
        tracks: ['00:10 大笨钟', '01:12 再见','03:25 GGBOND'],
      },
      {
        id: 8,
        cover: './src/assets/picture/2021.12.28.avif',
        title: 'The Dogs live aid II 2021.12.28 Nen Jiang 全国巡演第一站 A场',
        members: ['wade', 'police dog','赵默然'],
        link: 'https://www.bilibili.com/video/BV1S44y177v5/?spm_id_from=333.1387.homepage.video_card.click',
        tracks: ['00:12 曹操', '01:13 Bohemian Rhapsody','03:21 富士山下','06:55 We Will Rock You'],
      },

    ] as Work[],
  }),
  actions: {
    getWorkById(id: number): Work | undefined {
      return this.works.find(work => work.id === id);
    },
    async fetchWorkById(id: number): Promise<Work | undefined> {
      // 模拟异步请求，例如从服务器获取数据
      // const response = await fetch(`/api/works/${id}`);
      // return await response.json();
      
      // 当前使用本地模拟数据
      return Promise.resolve(this.getWorkById(id));
    }
  },
});