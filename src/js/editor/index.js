import angular from 'angular';

let editorModule = angular.module('app.editor', []);

import EditorConfig from './editor.config';
editorModule.config(EditorConfig);

import EditorCtrl from './editor.controller';
editorModule.controller('EditorCtrl', EditorCtrl);

export default editorModule;
