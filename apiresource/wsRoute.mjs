import ACBController from "../controller/ACBController.mjs";
import VCBController from "../controller/VCBController.mjs";

/**
 *
 * @param {WebSocket} ws
 * @param {*} req
 */
export async function crawlData(ws, req) {
  try {
    /**
     * binding Controller
     */
    const bankArray = [new ACBController(), new VCBController()];
    for (let i = 0; i < bankArray.length; i++) {
      const result = await bankArray[i].handlerWebsocket();
      ws.send(JSON.stringify(result));
    }
  } catch (error) {
    console.log(error);
    ws.send(JSON.stringify({ type: "error", message: "Something wrong with websocket controller" }));
  }
}
