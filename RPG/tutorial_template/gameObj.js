/*-----
a player entity
*/
var PlayerEntity = me.ObjectEntity.extend({
	//constructor
	init:function(x,y,settings){
		//call constructor
		this.parent(x,y,settings);
		
		//set the walking and jumping speed
		this.setVelocity(3, 15);
		
		//adjust tje bounding box
		this.updateColRect(8, 48, -1, 0);
		
		//set the display to follow our position
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
	},
	
	/**
	 * helper function for platform games
	 * make the entity move left of right
	 * @param {Boolean} left will automatically flip horizontally the entity sprite
	 */
	doWalk : function(left) {
		this.flipX(left);
		this.vel.x += (left) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
	},
	
	//update the player pos
	update: function(){
		if(me.input.isKeyPressed('left')){
			this.doWalk(true);
		}else if(me.input.isKeyPressed('right')){
			this.doWalk(false);
		}else{
			this.vel.x = 0;
		}
		if(me.input.isKeyPressed('jump')){
			this.doJump();
		}
		//check and update player movement
		this.updateMovement();
		
		//update animation if neccesssary
		if(this.vel.x!=0 || this.vel.y!=0){
			//update object animation
			this.parent(this);
			return true;
		}
		return false;
	}
	
});



