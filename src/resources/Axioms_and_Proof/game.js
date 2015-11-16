/*
 * $Id: $
 *
 * Copyright (C) 2012 Stoyan Rachev (stoyanr@gmail.com)
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 */

var NUM_TOWERS = 3;

var TOWER_WIDTH  = $('#Hanoi').width() / 3 - 1;
var TOWER_HEIGHT = 190;
var TOWER_XWIDTH = 10;

var DISK_WIDTHS = [ 0.3*TOWER_WIDTH, 0.4*TOWER_WIDTH, 0.5*TOWER_WIDTH, 0.6*TOWER_WIDTH, 0.7*TOWER_WIDTH, 0.8*TOWER_WIDTH, 0.9*TOWER_WIDTH ];
var DISK_HEIGHT = 24;

var FONT_SIZE = 14;
var FONT_FACE = '"futura-pt", Futura Std, "Futura", "Helvetica", sans-serif';

function Game() {
	this.numDisks = $("#numDisks").val();
	this.towers = [];
	this.disks = [];
	this.moves = 0;
}

Game.prototype.init = function() {
	this.clean();
	this.createTowers();
	this.createDisks();
	this.initTowers();
	this.initDisks();
	this.positionDisks();
	this.updateDraggableDisks();
}

Game.prototype.clean = function() {
	$("#HanoiGame").empty();
	$("#images").empty();
	$("#moves").html(0);
}

Game.prototype.createTowers = function() {
	for (var i = 0; i < NUM_TOWERS; i++) {
		var tower = new Tower(i, TOWER_WIDTH, TOWER_HEIGHT, TOWER_XWIDTH, $.proxy(this.handleDrop, this));
		this.towers.push(tower);
		$("#HanoiGame").append(tower.createElement());
	}
	$("#images").append(tower.createImageElement());
}

Game.prototype.initTowers = function() {
	for (var i = 0; i < this.towers.length; i++) {
		this.towers[i].init();
	}
}

Game.prototype.createDisks = function() {
	for (var i = 0; i < this.numDisks; i++) {
		var disk = new Disk(i, DISK_WIDTHS[i], DISK_HEIGHT, FONT_SIZE, FONT_FACE, $.proxy(this.handleDrag, this));
		this.disks.push(disk);
		$("#HanoiGame").append(disk.createElement());
		$("#images").append(disk.createImageElement());
	}
	for (var j = this.numDisks - 1; j >= 0; j--) {
		this.towers[0].addDisk(this.disks[j]);
		this.disks[j].setTower(this.towers[0]);
	}
}

Game.prototype.initDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].init();
	}
}

Game.prototype.positionDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].position();
	}
}

Game.prototype.updateDraggableDisks = function() {
	for (var i = 0; i < this.towers.length; i++) {
		this.towers[i].updateDraggableDisks();
	}
}

Game.prototype.handleDrag = function(event, ui) {
	this.getDisk($(event.target)).setDraggableRevert(true);
}

Game.prototype.handleDrop = function(event, ui) {
	var tower = this.getTower($(event.target));
	var disk = this.getDisk(ui.draggable);
	if (tower.getNum() != disk.getTower().getNum()) {
		this.moves++;
		$("#moves").text(this.moves);
		if (tower.canPlaceDisk(disk)) {
			disk.setDraggableRevert(false);
			tower.moveDisk(disk);
			disk.position();
			this.updateDraggableDisks();
			this.checkSolved();
		}
	}
}

Game.prototype.checkSolved = function() {
	for (var i = 1; i < this.towers.length; i++) {
		if (this.towers[i].getDisks().length == this.disks.length) {
			alert("Solved in " + this.moves + " moves.");
			$("#startOver").click();
			break;
		}
	}
}

Game.prototype.getTower = function(elem) {
	return this.towers[getNum(elem)];
}

Game.prototype.getDisk = function(elem) {
	return this.disks[getNum(elem)];
}

function getNum(o) {
	return getLast(o.attr("id"));
}

function getLast(s) {
	return s.charAt(s.length - 1);
}
