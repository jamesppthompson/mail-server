const mailClient = require('node-mail-client');
const nodemailer = require('nodemailer');
const simpleParser = require('mailparser').simpleParser;
const email_content_parse = require('./email-content-parser');
var Imap = require('imap'),
inspect = require('util').inspect;

// checkAuth will be called automatically and it will check email account authenticity
const mailConfiguration = async () => {

    const onEmailReceived = async (email) => {
        if(await email_content_parse(email.text)) return;
    };

    let mail=new mailClient({
        user:`angel@digitalcompany.us`, // your address
        pass:`Angel04230319`, // your password
        imap:['imap.mail.us-east-1.awsapps.com',993], // [host,port,tls]
        smtp:['smtp.mail.us-east-1.awsapps.com',465], // [host,port,secure]
        name:'angel' // your name when send
    });
    
    // skip checkAuth check
    mail.check=1  // 0: init  1:pass  2:fail

    const sendMail = (to, subject, text, html = "") => {
        // send - perfect
        mail.send({ to, subject, text, html }).then(info=>{
            console.log("===send===", info);
        }).catch(console.error)
    }

    var imap = new Imap({
        user: 'angel@digitalcompany.us',
        password: 'Angel04230319',
        host: 'imap.mail.us-east-1.awsapps.com',
        port: 993,
        tls: true
    });
    function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
    }
    
    imap.on('email', function(email) {
        console.log(email);
    });
    
    let start_date = new Date('2022-11-22T19:48:53.000Z'); // select the latest date in prospect database
    imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err) throw err;
            
            const emailSearch = () => {
                imap.search([ 'UNSEEN', ['SINCE', start_date] ], function(err, results) {
                    if (err) throw err;
                    var f = imap.fetch(results, { bodies: '' });
                    f.on('message', function(msg, seqno) {
                        // console.log('====Message #%d====', seqno);
                        // var prefix = '====(#' + seqno + ')===== ';
                        msg.on('body', async function(stream, info) {
                            let parsed = await simpleParser(stream);
                            if(start_date < parsed.date) {
                                await onEmailReceived(parsed);
                                start_date = parsed.date;
                                console.log("===email content====", parsed.date);
                            }
                        });
                        msg.once('attributes', function(attrs) {
                            // console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                        });
                        msg.once('end', function() {
                            // console.log(prefix + 'Finished');
                        });
                    });
                    f.once('error', function(err) {
                        console.log('Fetch error: ' + err);
                    });
                    f.once('end', function() {
                        console.log('Done fetching all messages!');
                    });
                });
            }
            
            setInterval(emailSearch, 10000);
        });
    });
    imap.once('error', function(err) {
        console.log(err);
    });
    imap.once('end', function() {
        console.log('Connection ended');
    });
    imap.connect();

}

module.exports = mailConfiguration;