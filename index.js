require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const app = express();
const port = 5001;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const webhook = req.body;

  for (const erc20Transfers of webhook.erc20Transfers) {
    const fromAddress = `From: ${erc20Transfers.from.slice(
      0,
      4
    )}...${erc20Transfers.from.slice(-8)}`;
    const toAddress = `To: ${erc20Transfers.to.slice(
      0,
      4
    )}...${erc20Transfers.to.slice(-8)}`;
    
    const tokenValue = `Value: ${erc20Transfers.value/1000000000000000}`;

    const transactionHash = `Hash: ${erc20Transfers.transactionHash.slice(
      0,
      4
    )}...${erc20Transfers.to.slice(-8)}`;

    const chatId = 1158621283;
    const text = `${fromAddress}, ${toAddress}, ${tokenValue}, ${transactionHash}`;

    bot.sendMessage(chatId, text);
    console.log(text)
  }

    return res.status(200).json();
});

const chatId = 1158621283;
bot.sendMessage(chatId, "Listening for fETH Transfers - Active");

app.listen(port, () => {
  console.log(`Listening for fETH Transfers`);
});