import { defineStore } from 'pinia';

export const useCarouselStore = defineStore('carousel', {
    state: () => ({
        images: [
            { src: './src/assets/picture/2022.5.31.avif', link: 'https://www.bilibili.com/video/BV1yU4y1D7yL/?spm_id_from=333.1387.homepage.video_card.click' ,info:'巡演最终场 The Dogs:归来 2022年5月31日复出演出'},
            { src: './src/assets/picture/2022.3.30.avif', link: 'https://www.bilibili.com/video/BV1eL4y1L7qS/?spm_id_from=333.1387.homepage.video_card.click' ,info:'双重幻想巡演第二场 DOUBLE FANTASY TOUR 2022.3.30'},
            { src: './src/assets/picture/2022.2.14.avif', link: 'https://www.bilibili.com/video/BV18P4y1w7hk/?spm_id_from=333.1387.homepage.video_card.click' ,info:'万夫莫敌巡演 第一场 Invincible Tour in NenJiang 2022.2.14'},
            { src: './src/assets/picture/2021.12.28.avif', link: 'https://www.bilibili.com/video/BV1S44y177v5/?spm_id_from=333.1387.homepage.video_card.click' ,info:'The Dogs live aid II 2021.12.28 Nen Jiang 全国巡演第一站 A场'},
            { src: './src/assets/picture/2022.1.25.avif', link: 'https://www.bilibili.com/video/BV1VS4y1L749/?spm_id_from=333.1387.homepage.video_card.click' ,info:'The Dogs live aid II 2022.1.25 Nen Jiang 全国巡演第二站 高中站'}
        ]
    }),
    actions: {
        // 可以在这里定义一些操作状态的方法
    }
});