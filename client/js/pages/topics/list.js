/*global app, alert*/
var log = require('bows')('topics');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var TopicView = require('client/js/views/topic');
var Topic = require('client/js/models/topic');
var AmpersandCollection = require('ampersand-collection');
var topicKinds = require('options').kinds.topics;
var Tag = require('client/js/models/tag');
var _ = require('client/js/helpers/underscore');
var $ = require('client/js/helpers/jquery');
var async = require('async');


var selectedKind = 'showall';
var selectedTag = 'showall';

function filtering(collection,filter){
  return collection.filter(function(topic){
    return topic.kind == filter;
  });
}
function rerender(page, collection, kind, tag){
  page.renderWithTemplate();
  page.renderCollection(collection, TopicView, page.queryByHook('topics-list'));

  page.renderKindFilters();

  page.queryByHook(selectedKind).classList.remove('selected');
  page.queryByHook(kind).classList.add('selected');

  page.queryByHook(selectedTag).classList.remove('selected');
  page.queryByHook(tag).classList.add('selected');

  selectedKind = kind;
  selectedTag = tag;
  return false;
}

module.exports = PageView.extend({
  pageTitle: 'Topics',
  template: templates.pages.topics.list,
  events: {
    'click [data-hook~=showall]': 'showall',

    'click [data-hook~=kind-filters]': 'handleKindFilter',

    'click [data-hook~=tag-filters]': 'handleTagFilter',

    'click [data-hook~=me]': 'me',

    'click [data-hook~=hide]': 'hide',
  },
  hidden: false,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, TopicView, this.queryByHook('topics-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }

    this.renderKindFilters();
    this.renderTagFilters();

    this.queryByHook(selectedKind).classList.add('selected');
    this.queryByHook(selectedTag).classList.add('selected');
  },
  fetchCollection: function () {
    log('Fetching topics');
    this.collection.fetch();

    return false;
  },
  renderKindFilters: function () {
    var self = this;
    var filterContainer = $(self.queryByHook('kind-filters'));// $.hook('kind-filters');
    _.each(topicKinds, function (kind) {
      filterContainer.append('<li><div class=\'ink-button\' data-hook=\''+kind.id+'\'>'+kind.name+'</div></li>');
    });
  },
  handleKindFilter: function (ev) {
    var kind = ev.target.getAttribute('data-hook');

    log('Fetching', kind);

    var aux = filtering(this.collection, kind);
    aux = new AmpersandCollection(aux, {model: Topic});

    rerender(this,aux,kind);

    return false;
  },
  renderTagFilters: function () {
    var self = this;

    var tags = app.tags.map(function (m) {
                              return [m.id, m.name];
                              });

    var filterContainer = $(self.queryByHook('tag-filters'));
    _.each(app.tags, function (tag) {
      console.log(tag.id);
      filterContainer.append('<li><div class=\'ink-button\' data-hook=\''+tag.id+'\'>'+tag.name+'</div></li>');
    });
  },
  handleTagFilter: function (ev) {
    var tag = ev.target.getAttribute('data-hook');

    log('Fetching', tag);

    var aux = filtering(this.collection, tag);
    aux = new AmpersandCollection(aux, {model: Topic});

    rerender(this,aux,tag);

    return false;
  },
  me: function () {
    log('Fetching my topics');
    var aux = this.collection.filter(function(topic){
      return topic.targets && topic.targets.indexOf(app.me.id) != -1;
    });

    aux = new AmpersandCollection(aux, {model: Topic});

    rerender(this,aux,'me','showall');

    return false;
  },
  showall: function () {
    rerender(this,this.collection,'showall');
    return false;
  },
  hide: function(){
    if(!this.hidden){
      this.queryByHook('awesome-sidebar').style.display = 'none';
      this.hidden = true;
    }
    else{
      this.queryByHook('awesome-sidebar').style.display = 'block';
      this.hidden = false;
    }
  }
});
