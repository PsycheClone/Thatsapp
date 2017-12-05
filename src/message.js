import {inject} from 'aurelia-framework';
import {bindable, bindingMode} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-framework';

@inject(TaskQueue)
export class MessageCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) message;

  constructor(taskQueue) {
    this.taskQueue = taskQueue;
  }

  attached() {
    console.log(this.message.error !== "none");
    this.taskQueue.queueMicroTask(() => {
      $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight)
    });
  }

  isError() {
    return this.message.error !== "none";
  }
}
