case "daily":
          if (!isJoin)
            return client.sendMessage(
              from,
              `Kamu belum register! ketik ${prefix}join`,
              text,
              {
                quoted: sen,
              }
            );
          let dailytimeout = 86400000;
          let dailyamount = 10000;

          let daily = await db.fetch(`daily_${sender}`);

          if (daily !== null && dailytimeout - (Date.now() - daily) > 0) {
            let dailytime = ms(dailytimeout - (Date.now() - daily));

            client.sendMessage(
              from,
              `Tunggu Cooldown ${dailytime.hours} jam ${dailytime.minutes} menit, ${dailytime.seconds} detik`,
              text,
              {
                quoted: sen,
              }
            );
          } else {
            client.sendMessage(
              from,
              `Kamu memggunakan harian dan mendapatkan ${dailyamount} uang!`,
              text,
              {
                quoted: sen,
              }
            );
            db.add(`uang_${sender}`, dailyamount);
            db.set(`daily_${sender}`, Date.now());
          }
