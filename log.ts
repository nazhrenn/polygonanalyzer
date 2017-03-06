
export class Log {
  private static logElement = document.getElementById('log');
  
  private static append(message: string) {
    let block: HTMLElement = document.createElement("div");
    block.textContent = message;
   
    Log.logElement.appendChild(block);
  }
}