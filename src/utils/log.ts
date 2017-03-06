
export class Log {
  private static logElement = document.getElementById('log');

  public static clear(): void {
    while (Log.logElement.firstChild) {
      Log.logElement.removeChild(Log.logElement.firstChild);
    }
  }

  public static append(message: any) {
    let block: HTMLElement = document.createElement("div");
    block.innerHTML = message;

    Log.logElement.appendChild(block);
  }
}