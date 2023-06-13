import { Controller, Get, Param, NotFoundException, UseGuards, Post, Body, Put, Delete, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PricingsService } from './pricings.service';
import { Pricing as PricingEntity } from './pricing.entity';
import { PricingDto } from './dto/pricing.dto';

@Controller('pricings')
export class PricingsController {
    constructor(private readonly pricingService: PricingsService) { }

    @Get()
    async findAll() {
        // get all pricings in the db
        return await this.pricingService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PricingEntity> {
        // find the pricing with this id
        const pricing = await this.pricingService.findOne(id);

        // if the pricing doesn't exit in the db, throw a 404 error
        if (!pricing) {
            throw new NotFoundException('This Pricing doesn\'t exist');
        }

        // if pricing exist, return the pricing
        return pricing;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() pricing: PricingDto, @Request() req): Promise<PricingEntity> {
        // create a new pricing and return the newly created pricing
        return await this.pricingService.create(pricing, req.user.owner.structure.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() pricing: PricingDto, @Request() req): Promise<PricingEntity> {
        // get the number of row affected and the updated pricing
        const { numberOfAffectedRows, updatedPricing } = await this.pricingService.update(id, pricing, req.user.owner.structure.id);

        // if the number of row affected is zero, it means the pricing doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Pricing doesn\'t exist');
        }

        // return the updated pricing
        return updatedPricing;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the pricing with this id
        const deleted = await this.pricingService.delete(id, req.user.owner.structure.id);

        // if the number of row affected is zero, then the pricing doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Pricing doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
