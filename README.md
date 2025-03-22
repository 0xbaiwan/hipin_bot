# HiPin 自动任务机器人

> [HiPin](https://t.me/hi_PIN_bot/app?startapp=p6AxOYV) 平台任务自动完成和资源收集机器人

## ✨ 功能特点

- 🔄 自动每日签到
- 💰 自动收集 Twitter、Google 和 Telegram 资源
- 📋 自动领取随机任务
- 🛡️ 完善的错误处理机制
- 📊 详细的控制台日志输出

## 🚀 安装说明

1. 克隆仓库：
```bash
git clone https://github.com/0xbaiwan/hipin_bot.git
cd hipin_bot
```

2. 安装依赖：
```bash
npm install
```

3. 在根目录创建 `token.txt` 文件并添加你的 HiPin 授权令牌：
```bash
echo "你的授权令牌" > token.txt
```

## 🔧 使用方法

运行机器人：
```bash
npm start
```

机器人将持续执行以下任务：
1. 检查个人资料信息
2. 获取并领取可用任务
3. 收集 Twitter、Google 和 Telegram 资源
4. 每轮任务间隔 10 秒

## 🔑 如何获取授权令牌

1. 登录 [HiPin](https://t.me/hi_PIN_bot/app?startapp=p6AxOYV)

2. 打开开发者工具
   - Windows/Linux：按 F12 键
   - macOS：按 Command + Option + I
   - 或右键点击页面任意位置 > 检查

3. 在开发者工具中：
   - 切换到"网络/Network"标签
   - 确保"保留日志/Preserve log"选项被勾选
   - 在过滤器中输入"home"以便快速找到目标请求

4. 在网页中进行任意操作（例如：刷新页面）

5. 在网络面板中找到请求：
   - 寻找名为"home"的请求（通常是对 `https://prod-api.pinai.tech/home` 的请求）
   - 点击该请求以查看详细信息

6. 在请求详情中：
   - 切换到"标头/Headers"标签
   - 滚动到"请求标头/Request Headers"部分
   - 找到 `authorization` 字段
   - 该字段值类似于：`Bearer eyJhbGc...`（一个很长的字符串）

7. 复制令牌值：
   - 只复制 `Bearer ` 后面的部分
   - 不要复制 `Bearer ` 这几个字符
   - 令牌通常以 `eyJ` 开头，包含多个点号
     
![image](https://github.com/user-attachments/assets/446912e5-027e-47fa-b940-b03654d087da)

8. 创建并编辑 token.txt：
   - 在项目根目录创建 `token.txt` 文件
   - 将复制的令牌粘贴到文件中
   - 确保令牌前后没有多余的空格
   - 保存文件

注意事项：
- 令牌有效期通常为 7 天，过期需要重新获取
- 请勿泄露你的令牌，它等同于你的账号登录凭证
- 如果看到 `Invalid token` 错误，说明令牌已过期或无效，需要重新获取

## 📊 控制台输出

机器人提供详细的控制台输出信息：
- 个人资料信息
- 当前等级和积分
- 任务领取状态
- 资源收集情况
- 错误提示信息

## ⚠️ 免责声明

本机器人仅供学习和研究使用。使用本机器人造成的任何后果（包括但不限于账号封禁或奖励损失）均由使用者自行承担。
