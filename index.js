const axios = require('axios');
const fs = require('fs').promises; 

/**
 * 基础配置
 * --------------------------------
 */
const BASE_URL = 'https://prod-api.pinai.tech';

/**
 * 获取授权令牌
 * @returns {Promise<string>} Bearer token
 */
async function getToken() {
    try {
        const token = await fs.readFile('token.txt', 'utf8');
        return `Bearer ${token.trim()}`;
    } catch (e) {
        console.error('❌ 读取 token.txt 失败:', e.message);
        process.exit(1); 
    }
}

// 请求头配置
let headers = {
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    'lang': 'en-US',
    'content-type': 'application/json',
    'sec-ch-ua': '"Chromium";v="133", "Microsoft Edge WebView2";v="133", "Not(A:Brand";v="99", "Microsoft Edge";v="133"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'Referer': 'https://web.pinai.tech/',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 程序启动横幅
const banner = `
╔════════════════════════════════════╗
║     Hi Pin 自动任务机器人 v1.0     ║
║         AirdropInsiders           ║
╚════════════════════════════════════╝
`;

/**
 * 检查用户主页信息
 * @returns {Promise<Object|null>} 用户信息
 */
async function checkHome() {
    try {
        const res = await axios.get(`${BASE_URL}/home`, { headers });
        const data = res.data;

        console.log('┌─────────── 用户信息 ───────────┐');
        console.log(`│ 👤 用户名称: ${data.user_info?.name || '未知'}`);
        console.log(`│ ✅ 今日签到: ${data.is_today_checkin ? '已完成' : '未完成'}`);
        console.log(`│ 📊 当前等级: ${data.current_model?.current_level || '未知'}`);
        console.log(`│ ⬆️  升级所需: ${data.current_model?.next_level_need_point || '未知'}`);
        console.log(`│ ⚡ 下级算力: ${data.current_model?.next_level_add_power || '未知'}`);
        console.log(`│ 🔋 数据算力: ${data.data_power || '未知'}`);
        console.log(`│ 💎 Pin积分数: ${data.pin_points_in_number || '未知'}`);
        console.log(`│ 📍 Pin积分值: ${data.pin_points || '未知'}`);
        console.log('└────────────────────────────────┘');

        return data;
    } catch (e) {
        console.error('❌ 获取用户信息失败');
        return null;
    }
}

/**
 * 获取随机任务列表
 * @returns {Promise<Object|null>} 任务列表
 */
async function getRandomTasks() {
    try {
        const res = await axios.get(`${BASE_URL}/task/random_task_list`, { headers });
        console.log('📋 成功获取任务列表');
        return res.data;
    } catch (e) {
        console.error('❌ 获取任务列表失败');
        return null;
    }
}

/**
 * 领取任务奖励
 * @param {string} taskId 任务ID
 */
async function claimTask(taskId) {
    try {
        const res = await axios.post(`${BASE_URL}/task/${taskId}/claim`, {}, { headers });
        console.log(`✅ 任务 ${taskId}: 领取成功`);
        return res.data;
    } catch (e) {
        console.error(`❌ 任务 ${taskId}: 领取失败`);
        return null;
    }
}

/**
 * 收集资源
 * @param {string} type 资源类型
 * @param {number} count 收集数量
 */
async function collectResources(type, count = 1) {
    try {
        const body = [{ type, count }];
        const res = await axios.post(`${BASE_URL}/home/collect`, body, { headers });
        console.log(`💰 ${type} 资源: 收集成功`);
        return res.data;
    } catch (e) {
        console.error(`❌ ${type} 资源: 收集失败`);
        return null;
    }
}

/**
 * 主运行循环
 */
async function runBot() {
    console.log(banner); 
    while (true) {
        console.log('\n🚀 开始新的运行周期...');

        await checkHome();
        console.log(''); 

        const tasks = await getRandomTasks();
        if (tasks?.data?.length) {
            console.log(`📋 发现 ${tasks.data.length} 个可用任务`);
            for (const task of tasks.data) {
                if (task.id) {
                    await claimTask(task.id);
                    await delay(1000);
                }
            }
        } else {
            console.log('📋 当前没有可用任务');
        }
        console.log(''); 

        console.log('┌─────────── 资源收集 ───────────┐');
        await collectResources('Twitter');
        await delay(2000);
        
        await collectResources('Google');
        await delay(2000);
        
        await collectResources('Telegram');
        await delay(2000);
        console.log('└────────────────────────────────┘');

        console.log(''); 
        console.log('✨ 本轮任务已完成');
        console.log('⏳ 等待10秒后开始下一轮...');
        await delay(10 * 1000);
    }
}

/**
 * 程序入口
 */
async function start() {
    const token = await getToken();
    headers.authorization = token;

    try {
        await runBot();
    } catch (e) {
        console.error('💥 程序异常:', e.message);
        console.log('🔄 5秒后重新启动...');
        await delay(5000);
        start();
    }
}

// 错误处理
process.on('unhandledRejection', (e) => console.error('⚠️ 未处理的异步错误:', e.message));
process.on('uncaughtException', (e) => console.error('⚠️ 未捕获的异常:', e.message));

start();