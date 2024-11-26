export async function hanldeConnection(ws, req) {
  try {
    /**
     * binding Controller
     */
  } catch (error) {
    console.log(error);
    ws.send(JSON.stringify({ type: "error", message: "Something wrong with websocket controller" }));
  }
}
