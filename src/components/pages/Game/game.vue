<template lang="pug">
  .game-master.center.row
    .col-xs-12.center
      select(v-model="selected" v-on:change='onchange()')
        option(v-for='file in files') {{file.filename}}      
    .game-container
      // inventory
      .game-inventory-btn(v-on:click='GameManager.UIManager.toggleInventory()')
      .game-inventory
        .game-inventory-next-btn(v-on:click='GameManager.InventoryManager.next()')
        .game-inventory-prev-btn(v-on:click='GameManager.InventoryManager.prev()')
        .game-item-container(v-if='!!GameManager.InventoryManager')
          .game-item.center(v-for='(item, index) in GameManager.InventoryManager.currentInventory' v-on:click='GameManager.InventoryManager.selectItem(item, index)')
            h1 {{item.name}}          
      // menus
      .game-menu-btn(v-on:click='GameManager.UIManager.toggleMenu()')
      .game-menu
      // dialog modal
      .game-dialog-modal
        .speaker
          p 
        .content
          p 
      // underscreen
      .game-closeall(v-on:click='GameManager.UIManager.closeUI()')
      // game canvas
      .canvas-container
        pixi-component(v-bind:ele='PixiComponents')

    // TEST BUTTONS
    .col-xs-12.center    
      button.btn-space(v-on:click='TestUtility.testLoadMasterSequencer()') Load Sequence
      button.btn-space(v-on:click='TestUtility.testNextMasterSequence()') Next Sequence
    .col-xs-12.center    
      button.btn-space(v-on:click='TestUtility.testLoadPixiFile()') Load Pixi File  
    .col-xs-12.center    
      button.btn-space(v-on:click='GameManager.UIManager.hideUI(false)') Hide Buttons
      button.btn-space(v-on:click='GameManager.UIManager.hideUI(true)') Show Buttons
      button.btn-space(v-on:click='GameManager.UIManager.closeUI()') Close UI
      button.btn-space(v-on:click='loadfile()') Reload
    .col-xs-12.center
      button.btn-space(v-on:click='TestUtility.addMockItems()') Add Items
      button.btn-space(v-on:click='TestUtility.removeMockItem()') Remove Item      
    .col-xs-12.center
      button.btn-space(v-on:click='TestUtility.testDialogClasses()') Test Dialog Classes
      button.btn-space(v-on:click='TestUtility.testDialogStyles()') Test Dialog Styles
      button.btn-space(v-on:click='TestUtility.nextDialog()') Next
      button.btn-space(v-on:click='TestUtility.autoplayDialog()') Autoplay
      button.btn-space(v-on:click='TestUtility.skipDialog()') Skip Dialog
</template>

<script src='./game.js'></script>

<style lang="sass" scoped>
  .game-master
    position: relative
    .btn-space
      margin-left: 10px    

    .game-container
      position: relative
      width: 1280px
      min-width: 1280px
      height: 720px   
      overflow: hidden
      background-color: black      
      padding: 0px
      border: 1px solid black

      .canvas-container
        position: absolute
        top: 0
        z-index: 1

      .game-dialog-modal
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        height: 200px
        background-color: rgba(0, 0, 0, .5) 
        z-index: 10

        .speaker  
          position: absolute
          top: 0
          left: 0
          height: 69%
          width: 190px
          padding: 30px 30px
          text-align: center
          p 
            font-size: 25px
        
        .content
          position: absolute
          top: 0
          left: 250px
          height: 69%
          width: calc(95% - 250px)
          padding: 30px 30px
          p 
            font-size: 18px          
          

      .game-inventory
        position: absolute
        z-index: 9
        width: 100%
        height: 100px
        background-color: rgba(0, 0, 0, .75)

        .game-item-container
          width: 100%
          height: 100%
          padding: 10px 100px
          z-index: 10
          
        .game-item
          width: 80px
          height: 85%
          background-color: red
          float: left        
          margin-left: 25px
          z-index: 10    
          cursor: pointer
          transition: 0.2s

        .game-item:hover
          transform: scale(1.1)
          transition: 0.2s
        
        .game-item:nth-child(11n)
          margin-left: 175px
        
        .game-inventory-prev-btn
          position: absolute
          top: 0
          left: 0
          background-color: white
          width: 50px
          height: 100%
          cursor: pointer
          z-index: 11

        .game-inventory-next-btn
          position: absolute
          top: 0
          right: 0
          background-color: orange
          width: 50px
          height: 100%
          cursor: pointer    
          z-index: 100      
              
      .game-menu
        position: absolute
        right: 0
        top: 0
        z-index: 9
        width: 200px
        height: 100%
        background-color: rgba(0, 0, 0, .75)

      .game-inventory-btn
        position: absolute
        left: 0
        z-index: 10
        width: 50px
        height: 50px
        border: 1px solid red
        cursor: pointer


      .game-menu-btn
        position: absolute
        right: 0
        z-index: 10
        width: 50px
        height: 50px
        border: 1px solid red
        cursor: pointer      

      .game-closeall
        position: absolute
        right: 0
        z-index: 5
        width: 100%
        height: 100%
        cursor: pointer
        background-color: rgba(0, 0, 0, .2)



</style>
