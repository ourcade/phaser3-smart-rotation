import Phaser from 'phaser'

export default class SmartRotationScene extends Phaser.Scene
{
	constructor()
	{
		super('smart-rotation')
	}

	preload()
    {
		this.load.image('arrow', 'assets/arrow.png')
    }

    create()
    {
		const { width, height } = this.scale
		
		this.arrow = this.add.image(width * 0.5, height * 0.5, 'arrow')
			.setOrigin(0.12, 0.5)

		this.degrees = this.add.text(width * 0.5, height * 0.5, '0', {
			fontSize: 24
		})
		.setOrigin(0.5)

		this.radians = this.add.text(this.degrees.x, this.degrees.y + 20, Phaser.Math.DegToRad(0).toString())
			.setOrigin(0.5)

		this.targetRotatoion = this.add.text(10, 10, 'Target: 0 (0)', {
			fontSize: 24
		})

		this.input.on(Phaser.Input.Events.POINTER_UP, this.handlePointerUp, this)
		this.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this)
	}

	/**
	 * 
	 * @param {Phaser.Input.Pointer} pointer 
	 */
	handlePointerUp(pointer)
	{
		const targetRad = Phaser.Math.Angle.Between(
			this.arrow.x, this.arrow.y,
			pointer.x, pointer.y
		)

		const currentRad = this.arrow.rotation

		let diff = targetRad - currentRad

		if (diff < -Math.PI)
		{
			diff += Math.PI * 2
		}
		else if (diff > Math.PI)
		{
			diff -= Math.PI * 2
		}

		this.tweens.add({
			targets: this.arrow,
			rotation: currentRad + diff,
			duration: 500,
			onUpdate: (tween) => {
				const value = tween.getValue()
				this.degrees.text = Math.round(Phaser.Math.RadToDeg(value)).toString()
				this.radians.text = value.toFixed(2)
			}
		})
	}

	/**
	 * 
	 * @param {Phaser.Input.Pointer} pointer 
	 */
	handlePointerMove(pointer)
	{
		const px = pointer.x
		const py = pointer.y

		const ox = this.arrow.x
		const oy = this.arrow.y

		const targetAngle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(ox, oy, px, py))
		const target = (targetAngle + 360) % 360
		this.targetRotatoion.text = `Target: ${Math.round(target).toString()} (${Phaser.Math.DegToRad(target).toFixed(2)})`

		this.arrow.angle = target
	}
}
