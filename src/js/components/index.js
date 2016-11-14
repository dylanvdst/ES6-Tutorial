import angular from 'angular';

let componentsModule = angular.module('app.components', []);

//components
import ListErrors from './list-errors.component';
componentsModule.component('ListErrors', ListErrors);

export default componentsModule;
