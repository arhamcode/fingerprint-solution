import axios from 'axios'
import * as xml2js from 'xml2js'

type AttenddanceData = {
    pin: string,
    time: string
}

export class FingerprintSolution {

    /**
     * Download data absensi dari mesin finger Solution
     *
     * parameter:
     * - ip
     *  alamat IP mesin finger di jaringan
     * - listPin
     *  array integer nomor PIN mana saja
     *  yang akan di download, kosongkan
     *  jika ingin mendownload semua data
     * 
     * ```js
     * const { FingerprintSolution } = require('fingerprint-solution')
     * const jsonData = FingerprintSolution.download('192.168.1.30', [1,2,4]);
     * ```
     */
    public static async download(ip: string, listPin: Array<number> = []): Promise<Array<AttenddanceData>> {
        let jsonDataOk: Array<AttenddanceData> = []

        let innerXml: string = '';

        if (listPin.length > 0) {
            listPin.map((listAttendanceCode) => {
                innerXml += `<Arg>
                <PIN xsi:type=\"xsd:integer\">${listAttendanceCode}</PIN>
                </Arg>`
            })
        } else {
            innerXml = '<Arg><PIN xsi:type=\"xsd:integer\">All</PIN></Arg>'
        }

        const soapBodyXml = `<GetAttLog>
          <ArgComKey xsi:type=\"xsd:integer\">0</ArgComKey>
          ${innerXml}
        </GetAttLog>`

        try {
            const response = await axios.post(`http://${ip}/iWsService`, soapBodyXml, {
                headers: {
                    'Content-Type': 'text/xml',
                    'Content-Length': Buffer.byteLength(soapBodyXml)
                }
            })

            xml2js.parseString(response.data, (err, result) => {
                result.GetAttLogResponse.Row.map(item => {
                    jsonDataOk.push({
                        pin: item.PIN[0],
                        time: item.DateTime[0]
                    })
                })
            })
            return jsonDataOk
        } catch (error) {
            throw Error('Gagal mengambil data.')
        }
    }
}
