class EditorCtrl{
  constructor(){
    'ngInject';

    this.article = {
      title: '',
      description: '',
      body: '',
      tagList: []
    }
  }

  addTag(){
    if(!this.article.tagList.includes(this.tagField)){
      this.article.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName){
    this.article.tagList = this.article.tagList.filter((slug) => slug != tagName);
  }
}

export default EditorCtrl;
