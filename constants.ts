import { Service } from './types';
import * as Icons from './components/icons';

export const SERVICES: Service[] = [
    { name: 'all', color: 'gray-500', icon: Icons.AllIcon },
    { name: 'facebook', color: 'blue-600', icon: Icons.FacebookIcon },
    { name: 'instagram', color: 'pink-500', icon: Icons.InstagramIcon },
    { name: 'twitter', color: 'sky-400', icon: Icons.TwitterIcon },
    { name: 'apple', color: 'gray-300', icon: Icons.AppleIcon },
    { name: 'tiktok', color: 'purple-500', icon: Icons.TiktokIcon },
    { name: 'amazon', color: 'orange-400', icon: Icons.AmazonIcon },
    { name: 'lazada', color: 'red-500', icon: Icons.LazadaIcon },
    { name: 'kakaotalk', color: 'yellow-400', icon: Icons.KakaotalkIcon },
    { name: 'google', color: 'red-600', icon: Icons.GoogleIcon },
    { name: 'shopee', color: 'orange-600', icon: Icons.ShopeeIcon },
    { name: 'telegram', color: 'blue-400', icon: Icons.TelegramIcon },
    { name: 'wechat', color: 'green-500', icon: Icons.WechatIcon }
];